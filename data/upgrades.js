// ============ АПГРЕЙДЫ ============
window.UPGRADES = [
  // ============ УРОВЕНЬ 0: СХЕМЫ ============
  {
    id: 'phone', name: 'Телефон', icon: 'assets/upgrades/up-phone.png', fallbackEmoji: '📱',
    basePrice: 50, effect: { type: 'perClick', value: 1 }, desc: '+1 за клик',
    count: 0, requires: null, requiresCount: 0,
    prestigeLevel: 0, section: 'schemes'
  },
  {
    id: 'sim', name: 'Симка', icon: 'assets/upgrades/up-sim.png', fallbackEmoji: '📶',
    basePrice: 200, effect: { type: 'perClick', value: 5 }, desc: '+5 за клик',
    count: 0, requires: 'phone', requiresCount: 25,
    prestigeLevel: 0, section: 'schemes'
  },
  {
    id: 'dealer', name: 'Барыга', icon: 'assets/upgrades/up-dealer.png', fallbackEmoji: '🧑',
    basePrice: 500, effect: { type: 'perSecond', value: 1 }, desc: '+1 в секунду',
    count: 0, requires: 'sim', requiresCount: 25,
    prestigeLevel: 0, section: 'schemes'
  },
  {
    id: 'point', name: 'Точка', icon: 'assets/upgrades/up-point.png', fallbackEmoji: '🏪',
    basePrice: 2000, effect: { type: 'perSecond', value: 10 }, desc: '+10 в секунду',
    count: 0, requires: 'dealer', requiresCount: 25,
    prestigeLevel: 0, section: 'schemes'
  },
  {
    id: 'scheme', name: 'Схема', icon: 'assets/upgrades/up-scheme.png', fallbackEmoji: '🕳️',
    basePrice: 10000, effect: { type: 'multiplier', value: 2 }, desc: 'множитель x2 (одноразово)',
    count: 0, requires: 'point', requiresCount: 25,
    prestigeLevel: 0, section: 'schemes'
  },

  // ============ УРОВЕНЬ 1: МЕЛКИЙ БИЗНЕС ============
  {
    id: 'office', name: 'Офис', icon: 'assets/upgrades/up-office.png', fallbackEmoji: '🏢',
    basePrice: 100000, effect: { type: 'perSecond', value: 500 }, desc: '+500 в секунду',
    count: 0, requires: null, requiresCount: 0,
    prestigeLevel: 1, section: 'business1'
  },
  {
    id: 'firm', name: 'Фирма', icon: 'assets/upgrades/up-firm.png', fallbackEmoji: '🏛',
    basePrice: 500000, effect: { type: 'perClick', value: 500 }, desc: '+500 за клик',
    count: 0, requires: 'office', requiresCount: 25,
    prestigeLevel: 1, section: 'business1'
  },
  {
    id: 'roof', name: 'Своя крыша', icon: 'assets/upgrades/up-roof.png', fallbackEmoji: '🛡',
    basePrice: 2000000, effect: { type: 'totalBonus', value: 0.25 }, desc: '+25% к общему доходу',
    count: 0, requires: 'firm', requiresCount: 25,
    prestigeLevel: 1, section: 'business1'
  },
  {
    id: 'holding', name: 'Холдинг', icon: 'assets/upgrades/up-holding.png', fallbackEmoji: '🌳',
    basePrice: 10000000, effect: { type: 'perSecond', value: 25000 }, desc: '+25 000 в секунду',
    count: 0, requires: 'roof', requiresCount: 25,
    prestigeLevel: 1, section: 'business1'
  },
  {
    id: 'contract', name: 'Контракт', icon: 'assets/upgrades/up-contract.png', fallbackEmoji: '💼',
    basePrice: 50000000, effect: { type: 'multiplier', value: 2 }, desc: 'множитель x2 (одноразово)',
    count: 0, requires: 'holding', requiresCount: 25,
    prestigeLevel: 1, section: 'business1'
  }
];

// ============ АЧИВКИ ============
window.ACHIEVEMENTS = [
  { id:'firstK',  name:'Первый косарь', desc:'1000 ₽',       icon:'assets/achievements/ach-firstk.png',  emoji:'🥉', check:(s)=> s.money >= 1000 },
  { id:'fiftyK',  name:'Полтос',        desc:'50 000 ₽',     icon:'assets/achievements/ach-fiftyk.png',  emoji:'🥈', check:(s)=> s.money >= 50000 },
  { id:'million', name:'Лям',           desc:'1 000 000 ₽',  icon:'assets/achievements/ach-million.png', emoji:'🥇', check:(s)=> s.money >= 1000000 },
  { id:'clicks100', name:'Кликов 100',  desc:'100 кликов',   icon:'assets/achievements/ach-clicks.png',  emoji:'👆', check:(s)=> s.totalClicks >= 100 },
  { id:'prestige1', name:'Первый переезд', desc:'1 хата',    icon:'assets/achievements/ach-prestige.png', emoji:'🏠', check:(s)=> s.prestigeLevel >= 1 }
];

// ============ СИМВОЛЫ КАЗИНО ============
window.CASINO_SYMBOLS = [
  { id:'cherry',  emoji:'🍒', icon:'assets/casino/sym-cherry.png',  weight:25, payout:50, kind:'good', name:'Вишня' },
  { id:'lemon',   emoji:'🍋', icon:'assets/casino/sym-lemon.png',   weight:20, payout:3,  kind:'good', name:'Лимон' },
  { id:'money',   emoji:'💰', icon:'assets/casino/sym-money.png',   weight:18, payout:5,  kind:'good', name:'Бабки' },
  { id:'diamond', emoji:'💎', icon:'assets/casino/sym-diamond.png', weight:15, payout:10, kind:'good', name:'Алмаз' },
  { id:'seven',   emoji:'7️⃣', icon:'assets/casino/sym-seven.png',   weight:12, payout:20, kind:'good', name:'Семёрка' },
  { id:'cop',     emoji:'👮', icon:'assets/casino/sym-cop.png',     weight:6,  payout:0.5, kind:'bad', name:'Мент' },
  { id:'skull',   emoji:'💀', icon:'assets/casino/sym-skull.png',   weight:4,  payout:0,  kind:'bad', name:'Череп' }
];

// ============ СЕКЦИИ АПГРЕЙДОВ ============
window.UPGRADE_SECTIONS = {
  schemes:   { title: 'СХЕМЫ',           prestigeLevel: 0, icon: 'assets/ui/sec-schemes.png',   emoji: '📦' },
  business1: { title: 'МЕЛКИЙ БИЗНЕС',   prestigeLevel: 1, icon: 'assets/ui/sec-business1.png', emoji: '🏢' },
  business2: { title: 'КРУПНЫЙ БИЗНЕС',  prestigeLevel: 2, icon: 'assets/ui/sec-business2.png', emoji: '🏘' },
  business3: { title: 'МЕЖДУНАРОДНЫЙ',   prestigeLevel: 3, icon: 'assets/ui/sec-business3.png', emoji: '🌍' },
  business4: { title: 'МИРОВОЕ',         prestigeLevel: 4, icon: 'assets/ui/sec-business4.png', emoji: '👑' }
};

// ============ СЮЖЕТ ============
window.STORY = [
  // ============ 1-Я АРКА ============
  {
    id: 'ch1', trigger: 'phone', triggerCount: 25, chapter: 'ГЛАВА 1', title: 'Первый движ',
    bg: 'assets/story/bg/dlg-lavka.png',
    illustration: 'assets/story/ch1-phone.png', fallbackEmoji: '📱',
    avatars: {
      hero:     { file: 'assets/story/face-hero.png',     emoji: '🧑' },
      gosha:    { file: 'assets/story/face-gosha.png',    emoji: '😏' },
      stranger: { file: 'assets/story/face-stranger.png', emoji: '🕴' },
      cop:      { file: 'assets/story/face-cop.png',      emoji: '👮' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Ну чё, опять лавка, опять падик... А бабок нет.' },
      { speaker:'hero',  name:'Тёма', text:'Телефон старый, кнопочный. Но зато свой.' },
      { speaker:'gosha', name:'Гоша', text:'Э, слышь! Ты в теме?' },
      { speaker:'hero',  name:'Тёма', text:'Смотря какая тема, братан. Говори.' },
      { speaker:'gosha', name:'Гоша', text:'Симки нужны. Много. Найдёшь — озолотишься.' },
      { speaker:'hero',  name:'Тёма', text:'Хм... Симки, значит. Ну, попробуем.' },
      { speaker:'hero',  name:'Тёма', text:'В голове уже крутится схема...' }
    ],
    reward: { respect: 200, perClickBonus: 0.05, desc: '+200 уважения, +5% к клику навсегда' }
  },
  {
    id: 'ch2', trigger: 'sim', triggerCount: 25, chapter: 'ГЛАВА 2', title: 'Первые точки',
    bg: 'assets/story/bg/dlg-lavka.png',
    illustration: 'assets/story/ch2-sim.png', fallbackEmoji: '📶',
    avatars: {
      hero:     { file: 'assets/story/face-hero.png',     emoji: '🧑' },
      gosha:    { file: 'assets/story/face-gosha.png',    emoji: '😏' },
      stranger: { file: 'assets/story/face-stranger.png', emoji: '🕴' },
      cop:      { file: 'assets/story/face-cop.png',      emoji: '👮' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Прошла неделя. Уже не пацан с лавки — человек с симками.' },
      { speaker:'hero',  name:'Тёма', text:'Пять точек, десять, двадцать... Дело пошло.' },
      { speaker:'gosha', name:'Гоша', text:'Слышь, темщик. Есть барыга один, крутится у метро.' },
      { speaker:'hero',  name:'Тёма', text:'И чё с ним?' },
      { speaker:'gosha', name:'Гоша', text:'Говорят, ищет людей. Может, сведём?' },
      { speaker:'hero',  name:'Тёма', text:'Веди. Хуже не будет.' },
      { speaker:'hero',  name:'Тёма', text:'Схема складывается: симки → барыга → точки. Масштаб!' }
    ],
    reward: { respect: 500, perSecondBonus: 0.10, desc: '+500 уважения, +10% к доходу/сек навсегда' }
  },
  {
    id: 'ch3', trigger: 'dealer', triggerCount: 25, chapter: 'ГЛАВА 3', title: 'Свои люди',
    bg: 'assets/story/bg/dlg-garage.png',
    illustration: 'assets/story/ch3-dealer.png', fallbackEmoji: '🧑',
    avatars: {
      hero:     { file: 'assets/story/face-hero.png',     emoji: '🧑' },
      gosha:    { file: 'assets/story/face-gosha.png',    emoji: '😏' },
      stranger: { file: 'assets/story/face-stranger.png', emoji: '🕴' },
      cop:      { file: 'assets/story/face-cop.png',      emoji: '👮' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Барыга оказался нормальным мужиком. Зовут Гоша.' },
      { speaker:'hero',  name:'Тёма', text:'Работает чётко, не борзеет. Через месяц — три барыги, все свои.' },
      { speaker:'gosha', name:'Гоша', text:'Слушай, брат. У метро гараж пустой стоит. Хозяин уехал.' },
      { speaker:'gosha', name:'Гоша', text:'Может, займём? Точка простаивает.' },
      { speaker:'hero',  name:'Тёма', text:'А мусора?' },
      { speaker:'gosha', name:'Гоша', text:'Мусора не в курсе. Пока.' },
      { speaker:'hero',  name:'Тёма', text:'Ладно. Точка — это уже серьёзно. Готовь.' }
    ],
    reward: { respect: 1000, totalBonus: 0.15, desc: '+1000 уважения, +15% к общему доходу навсегда' }
  },
  {
    id: 'ch4', trigger: 'point', triggerCount: 25, chapter: 'ГЛАВА 4', title: 'Схема',
    bg: 'assets/story/bg/dlg-garage.png',
    illustration: 'assets/story/ch4-point.png', fallbackEmoji: '🏪',
    avatars: {
      hero:     { file: 'assets/story/face-hero.png',     emoji: '🧑' },
      gosha:    { file: 'assets/story/face-gosha.png',    emoji: '😏' },
      stranger: { file: 'assets/story/face-stranger.png', emoji: '🕴' },
      cop:      { file: 'assets/story/face-cop.png',      emoji: '👮' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Точка работает. Днём — ремонт телефонов, ночью — совсем другое.' },
      { speaker:'hero',  name:'Тёма', text:'Меня уже знают в районе. Уважают.' },
      { speaker:'gosha', name:'Гоша', text:'Слышь, брат. Проблема. Менты пришли к соседу, спрашивали про нас.' },
      { speaker:'hero',  name:'Тёма', text:'И чё теперь?' },
      { speaker:'gosha', name:'Гоша', text:'Либо в тень уходить, либо расширяться. Чтобы прикрывали свои. Понимаешь?' },
      { speaker:'hero',  name:'Тёма', text:'Понял. Готовь схему. Будем крышу строить.' }
    ],
    reward: { respect: 2000, perClickBonus: 0.20, desc: '+2000 уважения, +20% к клику навсегда' }
  },
  {
    id: 'ch5', trigger: 'scheme', triggerCount: 1, chapter: 'ГЛАВА 5', title: 'Выход на новый уровень',
    bg: 'assets/story/bg/dlg-garage.png',
    illustration: 'assets/story/ch5-scheme.png', fallbackEmoji: '🕳️',
    avatars: {
      hero:     { file: 'assets/story/face-hero.png',     emoji: '🧑' },
      gosha:    { file: 'assets/story/face-gosha.png',    emoji: '😏' },
      stranger: { file: 'assets/story/face-stranger.png', emoji: '🕴' },
      cop:      { file: 'assets/story/face-cop.png',      emoji: '👮' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Схема запущена. Всё завертелось: район, связи, деньги.' },
      { speaker:'hero',  name:'Тёма', text:'Но я чувствую — спальник мне мал. Нужно расти.' },
      { speaker:'stranger', name:'Незнакомец', text:'Мне сказали, ты умеешь решать вопросы.' },
      { speaker:'hero',  name:'Тёма', text:'Смотря какие. Ты вообще кто?' },
      { speaker:'stranger', name:'Незнакомец', text:'Неважно. Есть предложение. Большое.' },
      { speaker:'stranger', name:'Незнакомец', text:'Но сначала — переезжай. Здесь тебе тесно.' },
      { speaker:'hero',  name:'Тёма', text:'Хм. И куда переезжать?' },
      { speaker:'stranger', name:'Незнакомец', text:'Собери миллион — и узнаешь. Удачи, темщик.' },
      { speaker:'hero',  name:'Тёма', text:'Пора свалить из спальника. Начинается что-то серьёзное...' }
    ],
    reward: { respect: 5000, totalBonus: 1.0, desc: '+5000 уважения, +100% к общему доходу навсегда. Открыт переезд!' },
    afterStory: 'prestigeHint'
  },

  // ============ 2-Я АРКА ============
  {
    id: 'ch6', trigger: 'office', triggerCount: 25, chapter: 'ГЛАВА 6', title: 'Новый офис',
    bg: 'assets/story/bg/dlg-office.png',
    illustration: 'assets/story/ch6-office.png', fallbackEmoji: '🏢',
    avatars: {
      hero:   { file: 'assets/story/face-hero-2.png',  emoji: '🕴' },
      gosha:  { file: 'assets/story/face-gosha-2.png', emoji: '😎' },
      alina:  { file: 'assets/story/face-wife.png',    emoji: '👩' },
      boss:   { file: 'assets/story/face-boss.png',    emoji: '🧔' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Ну вот, снял офис. Стекло, вид на город, всё как у людей.' },
      { speaker:'hero',  name:'Тёма', text:'Только бумажек стало — мама не горюй. Бухгалтерия, отчёты...' },
      { speaker:'gosha', name:'Гоша', text:'Слышь, брат! Ты теперь бизнесмен?' },
      { speaker:'hero',  name:'Тёма', text:'А ты как думал. Всё, Гоша, завязал с тёмными делами.' },
      { speaker:'gosha', name:'Гоша', text:'Ха! Ну-ну. Посмотрим, как ты запоёшь через месяц.' },
      { speaker:'hero',  name:'Тёма', text:'Скучно, конечно, но зато прибыльно. Это только начало.' }
    ],
    reward: { respect: 10000, perClickBonus: 0.10, desc: '+10 000 уважения, +10% к клику навсегда' }
  },
  {
    id: 'ch7', trigger: 'firm', triggerCount: 25, chapter: 'ГЛАВА 7', title: 'Свои люди',
    bg: 'assets/story/bg/dlg-restaurant.png',
    illustration: 'assets/story/ch7-alina.png', fallbackEmoji: '👩',
    avatars: {
      hero:   { file: 'assets/story/face-hero-2.png',  emoji: '🕴' },
      gosha:  { file: 'assets/story/face-gosha-2.png', emoji: '😎' },
      alina:  { file: 'assets/story/face-wife.png',    emoji: '👩' },
      boss:   { file: 'assets/story/face-boss.png',    emoji: '🧔' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Деловой приём. Костюмы, шампанское, разговоры ни о чём.' },
      { speaker:'hero',  name:'Тёма', text:'И тут я её увидел. Алина. Элегантная, уверенная.' },
      { speaker:'alina', name:'Алина', text:'Вы, я смотрю, скучаете. Не любите такие мероприятия?' },
      { speaker:'hero',  name:'Тёма', text:'Честно? Терпеть не могу. Я больше по конкретным делам.' },
      { speaker:'alina', name:'Алина', text:'А что, интересно. Люблю конкретных людей.' },
      { speaker:'hero',  name:'Тёма', text:'Она не знает про моё прошлое. И, надеюсь, не узнает.' }
    ],
    reward: { respect: 20000, perSecondBonus: 0.15, desc: '+20 000 уважения, +15% к доходу/сек навсегда' }
  },
  {
    id: 'ch8', trigger: 'roof', triggerCount: 25, chapter: 'ГЛАВА 8', title: 'Разговор с Боссом',
    bg: 'assets/story/bg/dlg-penthouse.png',
    illustration: 'assets/story/ch8-boss.png', fallbackEmoji: '🧔',
    avatars: {
      hero:   { file: 'assets/story/face-hero-2.png',  emoji: '🕴' },
      gosha:  { file: 'assets/story/face-gosha-2.png', emoji: '😎' },
      alina:  { file: 'assets/story/face-wife.png',    emoji: '👩' },
      boss:   { file: 'assets/story/face-boss.png',    emoji: '🧔' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Купил юристов, охрану. Своя крыша — теперь я в безопасности.' },
      { speaker:'hero',  name:'Тёма', text:'Но не успел расслабиться — в дверь стучат.' },
      { speaker:'boss',  name:'Босс', text:'Здорово, Тёма. Слышал, ты тут бизнес поднял. Молодец.' },
      { speaker:'hero',  name:'Тёма', text:'Здорово. Ты вообще как тут оказался?' },
      { speaker:'boss',  name:'Босс', text:'Ты наш, Тёма. Не забывай. Или заплатишь. Ты же не хочешь, чтобы Алина узнала?' },
      { speaker:'hero',  name:'Тёма', text:'Вот чёрт. Легальный бизнес не спасёт от прошлого.' }
    ],
    reward: { respect: 50000, totalBonus: 0.25, desc: '+50 000 уважения, +25% к общему доходу навсегда' }
  },
  {
    id: 'ch9', trigger: 'holding', triggerCount: 25, chapter: 'ГЛАВА 9', title: 'Сделка',
    bg: 'assets/story/bg/dlg-penthouse.png',
    illustration: 'assets/story/ch9-deal.png', fallbackEmoji: '💼',
    avatars: {
      hero:   { file: 'assets/story/face-hero-2.png',  emoji: '🕴' },
      gosha:  { file: 'assets/story/face-gosha-2.png', emoji: '😎' },
      alina:  { file: 'assets/story/face-wife.png',    emoji: '👩' },
      boss:   { file: 'assets/story/face-boss.png',    emoji: '🧔' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Строю холдинг. Несколько фирм, юристы, партнёры.' },
      { speaker:'boss',  name:'Босс', text:'Слушай, Тёма. Давай по-честному. Сделаем тебя частью семьи.' },
      { speaker:'boss',  name:'Босс', text:'Ты возьмёшь больше. Я прикрою. Взамен — часть бизнеса.' },
      { speaker:'hero',  name:'Тёма', text:'Сколько?' },
      { speaker:'boss',  name:'Босс', text:'Двадцать процентов. И ты наш навсегда.' },
      { speaker:'hero',  name:'Тёма', text:'Хорошо. Двадцать. Но если ты меня кинешь — я найду тебя.' },
      { speaker:'boss',  name:'Босс', text:'Ха! Мне нравится твой подход, Тёма. По рукам.' },
      { speaker:'hero',  name:'Тёма', text:'Не нравится мне это. Но выбора нет. Пока.' }
    ],
    reward: { respect: 100000, perClickBonus: 0.30, desc: '+100 000 уважения, +30% к клику навсегда' }
  },
  {
    id: 'ch10', trigger: 'contract', triggerCount: 1, chapter: 'ГЛАВА 10', title: 'Крыша мира',
    bg: 'assets/story/bg/dlg-penthouse.png',
    illustration: 'assets/story/ch10-rooftop.png', fallbackEmoji: '🌃',
    avatars: {
      hero:   { file: 'assets/story/face-hero-2.png',  emoji: '🕴' },
      gosha:  { file: 'assets/story/face-gosha-2.png', emoji: '😎' },
      alina:  { file: 'assets/story/face-wife.png',    emoji: '👩' },
      boss:   { file: 'assets/story/face-boss.png',    emoji: '🧔' }
    },
    lines: [
      { speaker:'hero',  name:'Тёма', text:'Ну вот и всё. Контракт подписан. Холдинг работает.' },
      { speaker:'hero',  name:'Тёма', text:'Мы с Алиной на крыше пентхауса. Смотрим на город.' },
      { speaker:'alina', name:'Алина', text:'Ты добился, Тёма. Мы на самом верху.' },
      { speaker:'hero',  name:'Тёма', text:'Нет, Алина. Мы только начали. Это не вершина. Это старт.' },
      { speaker:'hero',  name:'Тёма', text:'Впереди — весь мир. И я до него доберусь.' }
    ],
    reward: { respect: 500000, totalBonus: 1.0, desc: '+500 000 уважения, +100% к общему доходу навсегда. Открыт 2-й переезд!' }
  }
];