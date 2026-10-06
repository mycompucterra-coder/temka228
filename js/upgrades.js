// ============ АПГРЕЙДЫ ============

window.getUpgradePrice = function(u) {
  return Math.floor(u.basePrice * Math.pow(1.15, u.count));
};

window.isUpgradeUnlocked = function(u) {
  if ((u.prestigeLevel ?? 0) > state.prestigeLevel) return false;
  if (!u.requires) return true;
  const prev = window.UPGRADES.find(x => x.id === u.requires);
  if (!prev) return true;
  return prev.count >= u.requiresCount;
};

function getLockInfo(u) {
  if ((u.prestigeLevel ?? 0) > state.prestigeLevel) {
    return `🔒 Откроется после ${u.prestigeLevel}-го переезда`;
  }
  if (!u.requires) return '';
  const prev = window.UPGRADES.find(x => x.id === u.requires);
  if (!prev) return '';
  return `🔒 Откроется после: ${prev.name} x${u.requiresCount} (у тебя x${prev.count})`;
}

window.renderUpgrades = function() {
  const grid = $('#upgradesGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const sections = {};
  window.UPGRADES.forEach(u => {
    const sec = u.section || 'schemes';
    if (!sections[sec]) sections[sec] = [];
    sections[sec].push(u);
  });

  const order = ['schemes', 'business1', 'business2', 'business3', 'business4'];

  order.forEach(secId => {
    const list = sections[secId];
    if (!list || list.length === 0) return;

    const secMeta = window.UPGRADE_SECTIONS[secId] || { title: secId, prestigeLevel: 0, emoji: '📦' };
    const secUnlocked = state.prestigeLevel >= secMeta.prestigeLevel;

    const header = document.createElement('div');
    header.className = 'upgrade-section-header';
    if (!secUnlocked) header.classList.add('locked');
    header.innerHTML = `
      <div class="section-title-wrap">
        <img class="section-icon" src="${secMeta.icon || ''}" alt=""
             onerror="this.replaceWith('${secMeta.emoji || '📦'}')">
        <span class="section-title">${secMeta.title}</span>
      </div>
      ${!secUnlocked ? `<span class="section-lock">🔒 После ${secMeta.prestigeLevel}-го переезда</span>` : ''}
    `;
    grid.appendChild(header);

    list.forEach(u => {
      const unlocked = isUpgradeUnlocked(u);
      const price = getUpgradePrice(u);
      const isMultiBought = u.effect.type === 'multiplier' && u.count > 0;
      const canAfford = state.money >= price && !isMultiBought && unlocked;

      const card = document.createElement('div');
      card.className = 'upgrade-card';

      if (!unlocked) card.classList.add('locked');
      else if (!canAfford && !isMultiBought) card.classList.add('disabled');

      if (u.count > 0) card.classList.add('bought');

      const descHtml = unlocked
        ? u.desc
        : `<div class="upgrade-lock-info">${getLockInfo(u)}</div>`;

      let priceHtml;
      if (!unlocked) priceHtml = '🔒 ЗАКРЫТО';
      else if (isMultiBought) priceHtml = '✅ КУПЛЕНО';
      else priceHtml = formatMoney(price);

      card.innerHTML = `
        ${!unlocked ? '<div class="upgrade-lock-badge">🔒</div>' : ''}
        <div class="upgrade-icon">
          <img src="${u.icon}" width="52" height="52" alt=""
               onerror="this.replaceWith('${u.fallbackEmoji}')">
        </div>
        <div class="upgrade-body">
          <div class="upgrade-name">${u.name}${u.count>0 ? ' <span class="upgrade-count">x'+u.count+'</span>' : ''}</div>
          <div class="upgrade-desc">${descHtml}</div>
          <div class="upgrade-price">${priceHtml}</div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!unlocked) {
          showToast(getLockInfo(u), 'danger');
          return;
        }
        if (isMultiBought) return;
        const p = getUpgradePrice(u);
        if (state.money < p) {
          showToast('Не хватает бабок, братан', 'danger');
          return;
        }
        state.money -= p;
        u.count++;

        if (u.effect.type === 'perClick') state.perClick += u.effect.value;
        else if (u.effect.type === 'perSecond') state.perSecond += u.effect.value;
        else if (u.effect.type === 'multiplier') state.multiplier *= u.effect.value;
        else if (u.effect.type === 'totalBonus') state.storyBonuses.totalBonus += u.effect.value;

        playSound('buy');
        showToast('Купил: ' + u.name, 'gold');

        const chapter = window.STORY.find(s => s.trigger === u.id);
        if (chapter && u.count === (chapter.triggerCount || 25)) {
          window.triggerStory(u.id);
        }

        updateStats();
        renderUpgrades();
        saveGame();
      });

      grid.appendChild(card);
    });
  });
};

// ---------- Ачивки ----------
window.renderAchievements = function() {
  const grid = $('#achieveGrid');
  if (!grid) return;
  grid.innerHTML = '';

  window.ACHIEVEMENTS.forEach(a => {
    const unlocked = !!state.achievements[a.id];
    const card = document.createElement('div');
    card.className = 'achieve-card ' + (unlocked ? 'unlocked' : 'locked');
    card.innerHTML = `
      <img src="${a.icon}" alt="" onerror="this.replaceWith('${a.emoji}')">
      <div class="achieve-name">${a.name}</div>
      <div class="achieve-desc">${a.desc}</div>
    `;
    grid.appendChild(card);
  });
};

window.checkAchievements = function() {
  window.ACHIEVEMENTS.forEach(a => {
    if (!state.achievements[a.id] && a.check(state)) {
      state.achievements[a.id] = true;
      showToast('🏆 Ачивка: ' + a.name, 'gold');
      saveGame();
    }
  });
};