// ============ ПЕРЕЕЗД (ПРЕСТИЖ) — 5 УРОВНЕЙ ============

const PRESTIGE_LEVELS = [
  { level: 1, money: 1000000,     story: 'ch5',  mult: 2,  title: 'Съёмная квартира', emoji: '🏢' },
  { level: 2, money: 10000000,    story: 'ch10', mult: 4,  title: 'Своя квартира',    emoji: '🏘' },
  { level: 3, money: 100000000,   story: 'ch15', mult: 8,  title: 'Свой дом',         emoji: '🏡' },
  { level: 4, money: 1000000000,  story: 'ch20', mult: 16, title: 'Пентхаус',         emoji: '🏰' },
  { level: 5, money: 10000000000, story: 'ch25', mult: 32, title: 'Империя',          emoji: '👑' }
];

function getNextPrestigeTarget() {
  return PRESTIGE_LEVELS.find(p => p.level === state.prestigeLevel + 1) || null;
}

window.updatePrestigeScreen = function() {
  const btn = $('#btnPrestige');
  const hint = $('#prestigeHint');
  if (!btn) return;

  const target = getNextPrestigeTarget();

  if (!target) {
    btn.disabled = true;
    hint.textContent = '👑 Ты на вершине. Империя построена.';
    return;
  }

  // Считаем пройденные главы из требуемой арки
  // Для ch5 — это главы 1-5, для ch10 — 1-10 и т.д.
  const requiredChapters = ['ch1','ch2','ch3','ch4','ch5','ch6','ch7','ch8','ch9','ch10'];
  const targetIdx = requiredChapters.indexOf(target.story);
  let done = 0;
  for (let i = 0; i <= targetIdx; i++) {
    if (state.storyDone[requiredChapters[i]]) done++;
  }
  const totalChapters = targetIdx + 1;

  const storiesOk = done >= totalChapters;
  const moneyOk = state.money >= target.money;
  const can = storiesOk && moneyOk;

  btn.disabled = !can;
  btn.textContent = `🏠 ПЕРЕЕХАТЬ → ${target.emoji} ${target.title}`;

  // Хинт — обе строки
  const lines = [];
  lines.push(`${storiesOk ? '✅' : '🔒'} Главы: ${done} / ${totalChapters}`);
  lines.push(`${moneyOk ? '✅' : '💰'} Деньги: ${formatMoney(state.money)} / ${formatMoney(target.money)}`);

  hint.innerHTML = lines.join('<br>');

  if (can) {
    hint.innerHTML += `<br><span style="color:#00ff88;font-weight:800;">Готов! Жми →</span>`;
  }
};

window.doPrestige = function() {
  const target = getNextPrestigeTarget();
  if (!target) return;

  if (state.money < target.money) return;
  if (!state.storyDone[target.story]) {
    showToast('Сначала пройди сюжет, братан', 'danger');
    return;
  }
  if (!confirm(`Переехать в "${target.title}"? Схемы и бабки сгорят, но множитель станет x${target.mult}.`)) return;

  state.prestigeLevel = target.level;
  state.prestigeMult = target.mult;

  // Сброс бабок и схем (уровень 0)
  state.money = 0;
  state.totalEarned = 0;
  state.perClick = 1;
  state.perSecond = 0;
  state.multiplier = 1;
  state.totalClicks = 0;
  state.respect = 0;

  window.UPGRADES.forEach(u => {
    if ((u.prestigeLevel ?? 0) === 0) u.count = 0;
  });

  showToast(`${target.emoji} Переезд! Ты в "${target.title}". Множитель x${target.mult}`, 'gold');
  updateStats();
  updateMainBackground();  // ← смена фона
  renderUpgrades();
  renderAchievements();
  updatePrestigeScreen();
  saveGame();
  switchScreen('main');
};

window.initPrestige = function() {
  const btn = $('#btnPrestige');
  if (btn) btn.addEventListener('click', doPrestige);
};