// ============ СЮЖЕТ-ДИАЛОГИ ============
let storyQueue = [];
let currentStory = null;
let currentLineIndex = 0;
let typewriterTimer = null;
let isTyping = false;

window.triggerStory = function(upgradeId) {
  const chapter = window.STORY.find(s => s.trigger === upgradeId);
  if (!chapter) return;
  if (state.storyDone[chapter.id]) return;

  storyQueue.push(chapter);
  if (!currentStory) showNextStory();
};

function showNextStory() {
  if (storyQueue.length === 0) {
    currentStory = null;
    return;
  }
  currentStory = storyQueue.shift();
  currentLineIndex = 0;

  $('#storyChapter').textContent = currentStory.chapter;
  $('#storyTitleSm').textContent = currentStory.title;

  const bgEl = $('#storyBg');
  bgEl.style.backgroundImage = `url('${currentStory.bg}')`;

  const ill = $('#storyIllustration');
  ill.classList.remove('has-image');
  ill.style.backgroundImage = '';
  const testImg = new Image();
  testImg.onload = () => {
    ill.style.backgroundImage = `url('${currentStory.illustration}')`;
    ill.classList.add('has-image');
  };
  testImg.src = currentStory.illustration;

  $('#storyFinal').classList.add('hidden');
  $('#storyHint').classList.remove('hidden');

  const modal = $('#modalStory');
  modal.classList.remove('hidden');
  activeModal = modal;

  showLine(0);
}

function showLine(index) {
  if (!currentStory) return;
  const line = currentStory.lines[index];
  if (!line) {
    showFinal();
    return;
  }

  $('#storyName').textContent = line.name;

  const avatarImg = $('#storyAvatar');
  const avatarFallback = $('#storyAvatarFallback');
  const avatars = currentStory.avatars || {};
  const av = avatars[line.speaker] || { emoji: '🧑' };

  avatarImg.classList.remove('loaded');
  avatarImg.src = '';
  avatarImg.onerror = () => {
    avatarImg.classList.remove('loaded');
    avatarFallback.style.display = 'flex';
    avatarFallback.textContent = av.emoji || '🧑';
  };
  avatarImg.onload = () => {
    avatarImg.classList.add('loaded');
    avatarFallback.style.display = 'none';
  };
  avatarImg.src = av.file;
  avatarFallback.style.display = 'flex';
  avatarFallback.textContent = av.emoji || '🧑';

  $('#storyDialogue').classList.remove('right');

  typewrite(line.text);
}

function typewrite(text) {
  if (typewriterTimer) {
    clearInterval(typewriterTimer);
    typewriterTimer = null;
  }

  const textEl = $('#storyText');
  const cursorEl = $('#storyCursor');
  textEl.textContent = '';
  cursorEl.classList.remove('hidden');
  isTyping = true;

  let i = 0;
  const speed = 22;

  typewriterTimer = setInterval(() => {
    if (i >= text.length) {
      clearInterval(typewriterTimer);
      typewriterTimer = null;
      isTyping = false;
      cursorEl.classList.add('hidden');
      return;
    }
    textEl.textContent += text.charAt(i);
    i++;
  }, speed);
}

function showFinal() {
  $('#storyHint').classList.add('hidden');
  const finalEl = $('#storyFinal');
  finalEl.classList.remove('hidden');

  const rewardEl = $('#storyReward');
  rewardEl.innerHTML = `<b>🎁 Награда:</b> ${currentStory.reward.desc}`;

  const nextBtn = $('#storyNext');
  nextBtn.onclick = (e) => {
    e.stopPropagation();
    applyStoryReward(currentStory);
    state.storyDone[currentStory.id] = true;
    saveGame();

    const wasPrestigeHint = currentStory.afterStory === 'prestigeHint';

    $('#modalStory').classList.add('hidden');
    activeModal = null;
    currentStory = null;
    currentLineIndex = 0;

    updateStats();
    renderAchievements();

    setTimeout(() => {
      showNextStory();
      if (wasPrestigeHint) {
        setTimeout(showPrestigeHintModal, 500);
      }
    }, 300);
  };
}

function applyStoryReward(chapter) {
  const r = chapter.reward;
  if (r.respect) state.respect += r.respect;
  if (r.perClickBonus) state.storyBonuses.perClickBonus += r.perClickBonus;
  if (r.perSecondBonus) state.storyBonuses.perSecondBonus += r.perSecondBonus;
  if (r.totalBonus) state.storyBonuses.totalBonus += r.totalBonus;

  playSound('chapter');
  showToast('📖 Глава пройдена: ' + chapter.title, 'story');
}

// ---------- Окно «Пора переезжать» ----------
window.showPrestigeHintModal = function() {
  const modal = $('#modalStory');
  const box = modal.querySelector('.story-modal');
  if (!modal || !box) return;

  box.innerHTML = `
    <div class="story-header">
      <div class="story-chapter">🏠 НОВАЯ ЦЕЛЬ</div>
      <div class="story-title-sm">Пора переезжать</div>
    </div>
    <div class="story-dialogue" style="display:block; text-align:center; padding:26px 22px;">
      <div style="font-size:4rem; margin-bottom:12px;">🏠</div>
      <div style="font-size:1.05rem; color:#ddd; line-height:1.6; max-width:480px; margin:0 auto;">
        Ты поднялся, Тёма. Спальник тебе мал.<br><br>
        Собери <b style="color:#00ff88;">1 000 000 ₽</b> — и свали отсюда.<br>
        Кнопка <b style="color:#00ff88;">«Переезд»</b> — внизу.
      </div>
    </div>
    <div class="story-final" style="padding:0 20px 22px;">
      <button class="modal-btn pay" id="prestigeHintOk" style="width:100%;">Понял 👊</button>
    </div>
  `;

  modal.classList.remove('hidden');
  activeModal = modal;

  const okBtn = document.getElementById('prestigeHintOk');
  if (okBtn) {
    okBtn.onclick = () => {
      modal.classList.add('hidden');
      activeModal = null;
      restoreStoryModalHTML();
    };
  }
};

// Восстановление исходного HTML окна сюжета
function restoreStoryModalHTML() {
  const modal = $('#modalStory');
  const box = modal.querySelector('.story-modal');
  if (!box) return;
  box.innerHTML = `
    <div class="story-bg" id="storyBg"></div>
    <div class="story-header">
      <div class="story-chapter" id="storyChapter">ГЛАВА 1</div>
      <div class="story-title-sm" id="storyTitleSm">Первый движ</div>
    </div>
    <div class="story-illustration" id="storyIllustration"></div>
    <div class="story-dialogue" id="storyDialogue">
      <div class="story-avatar-wrap" id="storyAvatarWrap">
        <img class="story-avatar" id="storyAvatar" alt="">
        <div class="story-avatar-fallback" id="storyAvatarFallback">🧑</div>
      </div>
      <div class="story-bubble-wrap">
        <div class="story-name" id="storyName">Тёма</div>
        <div class="story-bubble">
          <span class="story-text" id="storyText"></span>
          <span class="story-cursor" id="storyCursor">▍</span>
        </div>
      </div>
    </div>
    <div class="story-hint" id="storyHint">Клик — дальше ▸</div>
    <div class="story-final hidden" id="storyFinal">
      <div class="story-reward" id="storyReward"></div>
      <button class="modal-btn pay story-next" id="storyNext">Дальше ➡</button>
    </div>
  `;
}

window.initStoryClicks = function() {
  const modal = $('#modalStory');
  modal.addEventListener('click', (e) => {
    if (e.target.id === 'storyNext') return;
    if (e.target.id === 'prestigeHintOk') return;
    if (!$('#storyFinal') || !$('#storyFinal').classList.contains('hidden')) return;
    if (!currentStory) return;

    if (isTyping) {
      if (typewriterTimer) {
        clearInterval(typewriterTimer);
        typewriterTimer = null;
      }
      isTyping = false;
      $('#storyText').textContent = currentStory.lines[currentLineIndex].text;
      $('#storyCursor').classList.add('hidden');
      return;
    }

    currentLineIndex++;
    showLine(currentLineIndex);
  });
};