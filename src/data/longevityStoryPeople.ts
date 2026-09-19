// ============= Full file contents =============

export type StoryCategory = "business" | "culture" | "sport" | "science" | "state";

export type StoryPerson = {
  id: string;
  name: string;
  age: number;
  country: string;
  cat: StoryCategory;
  role: string;
  field?: string;
  chapter: 4 | 6 | 7;
  level: 1 | 2 | 3;
  lang?: "ru";
  wiki: string;
  before: string;
  turn: string;
  after: string;
  source: string;
  events: number[];
};


export const longevityStoryPeople: StoryPerson[] = [
  // 40–80: вторая половина
  {id:"dontsova",name:"Дарья Донцова",age:47,country:"Россия",cat:"culture",role:"писательница",field:"Литература",chapter:4,level:1,lang:"ru",wiki:"Дарья_Донцова",
   before:"Журналистка и переводчица, книг не писала.",
   turn:"Начала писать в больнице во время тяжёлой болезни — теперь у неё более двухсот книг.",
   after:"Дальше — более двухсот книг и первые места по тиражам в России.",
   source:"https://ru.wikipedia.org/wiki/Дарья_Донцова",events:[47]},
  {id:"trubnikov",name:"Андрей Трубников",age:49,country:"Россия",cat:"business",role:"основатель Natura Siberica",field:"Косметика",chapter:4,level:2,lang:"ru",wiki:"Трубников,_Андрей_Вадимович",
   before:"Выпускник МГИМО, сменил несколько занятий, затем занялся недорогой косметикой.",
   turn:"Запустил марку косметики на сибирских травах — она выросла в крупнейшую органическую в России.",
   after:"Бренд вышел в Европу и Азию и стал крупнейшей российской маркой органической косметики.",
   source:"https://ru.wikipedia.org/wiki/Трубников,_Андрей_Вадимович",events:[49]},
  {id:"freeman",name:"Морган Фриман",age:50,country:"США",cat:"culture",role:"актёр",field:"Кино",chapter:4,level:3,wiki:"Morgan_Freeman",
   before:"Сорок лет театра, эпизодов и детской телепрограммы почти без известности в кино.",
   turn:"До пятидесяти оставался малоизвестным — номинация на «Оскар» сделала его востребованным.",
   after:"Дальше — «Побег из Шоушенка», «Семь», «Малышка на миллион» и статус одного из самых востребованных актёров.",
   source:"https://www.britannica.com/biography/Morgan-Freeman",events:[50]},
  {id:"gapontsev",name:"Валентин Гапонцев",age:51,country:"Россия / США",cat:"business",role:"основатель IPG Photonics",field:"Лазерные технологии",chapter:4,level:1,lang:"ru",wiki:"Гапонцев,_Валентин_Павлович",
   before:"Физик, десятилетиями занимался лазерной оптикой в академических институтах.",
   turn:"Ушёл из науки в бизнес — его лазеры заняли около 80% мирового рынка.",
   after:"IPG Photonics заняла около 80% мирового рынка мощных волоконных лазеров, состояние основателя измерялось миллиардами.",
   source:"https://www.forbes.ru/rating/ekonomika/lyudi/67109-russkaya-hvatka",events:[51]},
  {id:"kroc",name:"Рэй Крок",age:52,country:"США",cat:"business",role:"создатель системы McDonald's",field:"Общественное питание",chapter:4,level:2,wiki:"Ray_Kroc",
   before:"Десятилетиями работал продавцом, в том числе продавал миксеры для молочных коктейлей.",
   turn:"Продавал миксеры, увидел ресторан братьев Макдональд и построил вокруг него глобальную франшизу.",
   after:"Создал McDonald's System, Inc., а позднее выкупил права на компанию.",
   source:"https://corporate.mcdonalds.com/corpmcd/our-company/who-we-are/our-history.html",events:[52,58]},
  {id:"alexandrov",name:"Борис Александров",age:48,country:"Россия",cat:"business",role:"основатель «Ростагроэкспорта»",field:"Пищевое производство",chapter:4,level:3,lang:"ru",wiki:"Александров,_Борис_Юрьевич",
   before:"Врач по образованию, работал в медицине и торговле.",
   turn:"Начал с молочного производства — его глазированные сырки покупала каждая десятая российская семья.",
   after:"За четверть века вырос в молочную империю: сырки его марки покупала каждая десятая российская семья.",
   source:"https://www.rbc.ru/business/30/11/2020/5fc4e7ce9a79471866b3436c",events:[48]},
  {id:"mandela",name:"Нельсон Мандела",age:75,country:"ЮАР",cat:"state",role:"первый президент ЮАР",field:"Государство",chapter:4,level:1,wiki:"Nelson_Mandela",
   before:"Двадцать семь лет в тюрьме, освобождение и годы переговоров о конце апартеида.",
   turn:"После двадцати семи лет заключения возглавил страну и мирно перевёл её к новой власти.",
   after:"Провёл ЮАР через мирный переход власти и отказался от второго срока.",
   source:"https://www.nelsonmandela.org/biography",events:[75]},



  // 80–100: активная деятельность
  {id:"murthy",name:"Нараяна Мурти",age:80,country:"Индия",cat:"business",role:"сооснователь Infosys",chapter:6,level:1,wiki:"N._R._Narayana_Murthy",
   before:"Создал Infosys и много лет управлял одной из компаний, сформировавших индийскую IT-индустрию.",
   turn:"Полвека после основания остаётся голосом, к которому прислушиваются новые предприниматели.",
   after:"Его роль давно не операционная: это пример перехода от управления компанией к влиянию на следующую генерацию предпринимателей.",
   source:"https://www.infosys.com/about/management-profiles/narayana-murthy.html",events:[80]},
  {id:"piotrovsky",name:"Михаил Пиотровский",age:81,country:"Россия",cat:"culture",role:"директор Государственного Эрмитажа",chapter:6,level:2,lang:"ru",wiki:"Пиотровский,_Михаил_Борисович",
   before:"Востоковед и исследователь, много лет работал в Институте востоковедения.",
   turn:"Больше тридцати лет на одном посту — и это по-прежнему ежедневная работа, а не почёт.",
   after:"Профессиональная деятельность остаётся институциональной и публичной — не как «хобби после пенсии», а как руководство большой организацией.",
   source:"https://www.hermitagemuseum.org/about/hermitage_director",events:[81]},
  {id:"ellison",name:"Ларри Эллисон",age:82,country:"США",cat:"business",role:"председатель и CTO Oracle",chapter:6,level:3,wiki:"Larry_Ellison",
   before:"Основал Oracle в 1977 году и десятилетиями был её CEO.",
   turn:"Стоит у истоков компании и до сих пор отвечает за её технологическую стратегию.",
   after:"Это модель, в которой операционное руководство можно передать, сохранив участие в технологии и стратегии.",
   source:"https://www.oracle.com/corporate/executives/larry-ellison/",events:[82]},
  {id:"bloomberg",name:"Майкл Блумберг",age:84,country:"США",cat:"business",role:"основатель Bloomberg",chapter:6,level:1,wiki:"Michael_Bloomberg",
   before:"Создал Bloomberg L.P., позже три срока был мэром Нью-Йорка.",
   turn:"После трёх сроков мэром вернулся к своей компании и большим филантропическим проектам.",
   after:"Пример поздней карьеры, где бизнес-капитал конвертируется в общественные и международные проекты.",
   source:"https://www.bloomberg.org/annualreport/",events:[84]},
  {id:"slim",name:"Карлос Слим",age:86,country:"Мексика",cat:"business",role:"предприниматель и инвестор",chapter:6,level:2,wiki:"Carlos_Slim",
   before:"Построил телекоммуникационный и промышленный конгломерат.",
   turn:"Остаётся архитектором крупных решений своей группы, а не ежедневным операционным руководителем.",
   after:"Здесь интересна не ежедневная операционная работа, а сохранение роли владельца капитала и архитектора крупных решений.",
   source:"https://www.forbes.com/profile/carlos-slim-helu/",events:[86]},
  {id:"chouinard",name:"Ивон Шуинар",age:87,country:"США",cat:"business",role:"основатель Patagonia",chapter:6,level:3,wiki:"Yvon_Chouinard",
   before:"Создал Patagonia и десятилетиями совмещал предпринимательство с экологическим активизмом.",
   turn:"Передал компанию ради природы, но продолжает работать над продуктом «больше, чем следует».",
   after:"Это другая модель: собственность передана, но профессиональная и ценностная работа продолжается.",
   source:"https://www.patagonia.com/progress-report/",events:[87]},
  {id:"pozner",name:"Владимир Познер",age:92,country:"Россия / Франция / США",cat:"culture",role:"журналист",chapter:6,level:1,lang:"ru",wiki:"Познер,_Владимир_Владимирович",
   before:"Более полувека работает в журналистике, телевидении и документальных проектах.",
   turn:"Профессия пережила смену каналов: от телевидения к книгам, лекциям и цифровым форматам.",
   after:"Его траектория показывает, как профессия может пережить смену каналов — от телевидения к книгам, публичным выступлениям и цифровым форматам.",
   source:"https://www.rbc.ru/life/news/66069df89a7947b9b6743422",events:[92]},
  {id:"buffett",name:"Уоррен Баффет",age:96,country:"США",cat:"business",role:"председатель Berkshire Hathaway",chapter:6,level:2,wiki:"Warren_Buffett",
   before:"Более полувека совмещал функции CEO и председателя Berkshire Hathaway.",
   turn:"Передал управление преемнику, но остался председателем — влияние сохранилось при меньшей нагрузке.",
   after:"Очень наглядная модель смены роли: меньше операционной нагрузки, сохранение институционального влияния.",
   source:"https://www.sec.gov/Archives/edgar/data/1067983/000119312526083899/brka-20251231.htm",events:[96]},
  {id:"pattison",name:"Джим Паттисон",age:97,country:"Канада",cat:"business",role:"Founder, Chairman & CEO",chapter:6,level:3,wiki:"Jim_Pattison",
   before:"Начал с автомобильного дилерства и построил диверсифицированную Jim Pattison Group.",
   turn:"Приходит в офис каждый день, включая выходные, — редкий пример полной операционной роли.",
   after:"Редкий пример сохранения именно операционной роли в очень позднем возрасте.",
   source:"https://www.forbes.com/profile/jim-pattison/",events:[97]},
  {id:"katz",name:"Алекс Кац",age:99,country:"США",cat:"culture",role:"художник",chapter:6,level:1,wiki:"Alex_Katz",
   before:"Работает как художник с середины XX века.",
   turn:"В столетнем возрасте одновременно идут и готовятся новые персональные выставки по всему миру.",
   after:"Карьера не просто сохраняет архивную ценность: новые выставочные циклы продолжаются практически в столетнем возрасте.",
   source:"https://www.alexkatz.com/exhibitions/current",events:[99]},

  // 100+: активность и субъектность
  {id:"attenborough",name:"Дэвид Аттенборо",age:100,country:"Великобритания",cat:"culture",role:"натуралист и телеведущий",chapter:7,level:1,wiki:"David_Attenborough",
   before:"Начал телевизионную карьеру в 1950-х.",
   turn:"Карьера длиной более семидесяти лет продолжается новыми программами, а не ретроспективами.",
   after:"В столетнем возрасте профессиональная деятельность остаётся публичной и связанной с новыми программами, а не только ретроспективами.",
   source:"https://www.guinnessworldrecords.com/news/2026/5/a-wild-life-the-record-breaking-career-of-sir-david-attenborough-as-he-turns-100",events:[100]},
  {id:"brooks",name:"Мел Брукс",age:100,country:"США",cat:"culture",role:"режиссёр, сценарист, актёр",chapter:7,level:2,wiki:"Mel_Brooks",
   before:"Одна из ключевых фигур американской комедии XX века.",
   turn:"После столетия участвует в производстве нового фильма и представил его публике.",
   after:"Это пример не только долголетия репутации, но и участия в новом производстве после столетия.",
   source:"https://people.com/mel-brooks-100-makes-his-comic-con-debut-at-100-via-video-for-spaceballs-12023158",events:[100]},
  {id:"vandyk",name:"Дик Ван Дайк",age:100,country:"США",cat:"culture",role:"актёр и автор",chapter:7,level:3,wiki:"Dick_Van_Dyke",
   before:"Телевидение, кино, сцена — карьера длиной более семи десятилетий.",
   turn:"К столетию выпустил новую книгу и по-прежнему тренируется каждый день.",
   after:"Здесь важна не «вечная работа», а сохранение режима, публичности и способности создавать новый материал.",
   source:"https://www.aarp.org/entertainment/celebrities/dick-van-dyke-inversion-table.html",events:[100]},
  {id:"orthmann",name:"Вальтер Ортманн",age:100,country:"Бразилия",cat:"business",role:"менеджер по продажам",chapter:7,level:1,wiki:"Walter_Orthmann",
   before:"Начал работать в текстильной компании в 15 лет.",
   turn:"Больше восьмидесяти лет в одной компании — мировой рекорд продолжительности карьеры.",
   after:"Редкий пример профессиональной, а не только бытовой активности после столетия.",
   source:"https://www.guinnessworldrecords.com/news/2022/4/100-year-old-brazilian-breaks-record-after-84-years-at-same-company-701664",events:[100]},
  {id:"kaur",name:"Ман Каур",age:101,country:"Индия",cat:"sport",role:"бегунья",chapter:7,level:2,wiki:"Man_Kaur",
   before:"Спортивную карьеру начала только в 93 года.",
   turn:"Начала бегать в девяносто три — и выиграла стометровку на мировых соревнованиях.",
   after:"Продолжала выступать на международных соревнованиях и стала символом очень позднего спортивного старта.",
   source:"https://www.runnersworld.com/news/a20854017/101-year-old-wins-four-gold-medals-at-the-world-masters-games/",events:[101]},
  {id:"akuzawa",name:"Кокити Акузава",age:102,country:"Япония",cat:"sport",role:"альпинист",chapter:7,level:3,wiki:"Kokichi_Akuzawa",
   before:"Много лет ходил в горы; незадолго до рекорда перенёс сердечную недостаточность.",
   turn:"После сердечной болезни поднялся на Фудзи — старше него на неё не поднимался никто.",
   after:"Guinness зафиксировал его как самого пожилого мужчину, поднявшегося на Фудзи.",
   source:"https://www.guinnessworldrecords.com/world-records/778506-oldest-person-to-climb-mount-fuji-male",events:[102]},
  {id:"hislop",name:"Вирджиния Хислоп",age:105,country:"США",cat:"science",role:"выпускница Stanford",chapter:7,level:1,wiki:"Virginia_Hislop",
   before:"Начала магистратуру в Stanford ещё в 1930-х, но обучение было прервано Второй мировой войной.",
   turn:"Диплом, отложенный войной, получила спустя восемьдесят лет — и это был настоящий выпускной.",
   after:"Это не профессиональный рекорд, а сильный пример того, что образовательная цель может оставаться актуальной через целую человеческую эпоху.",
   source:"https://ed.stanford.edu/news/lifelong-learning-stanford-gse-student-collects-her-master-s-degree-after-80-years-education",events:[105]},
  {id:"marchand",name:"Робер Маршан",age:105,country:"Франция",cat:"sport",role:"велогонщик",chapter:7,level:2,wiki:"Robert_Marchand_(cyclist)",
   before:"Начал серьёзно заниматься велоспортом уже в зрелом возрасте.",
   turn:"Установил часовой рекорд в категории, созданной специально для его возраста.",
   after:"Его пример интересен именно институционально: спортивная система создала новую возрастную категорию, потому что старый возрастной предел перестал описывать реальность.",
   source:"https://www.guinnessworldrecords.com/world-records/465166-oldest-competitive-cyclist",events:[105]},
  {id:"hawkins",name:"Джулия Хокинс",age:105,country:"США",cat:"sport",role:"спринтер",chapter:7,level:3,wiki:"Julia_Hawkins",
   before:"Всю жизнь ездила на велосипеде, а соревновательный бег начала только после 100 лет.",
   turn:"Соревновательный бег начала после ста лет — и сама открыла категорию 105+.",
   after:"Продолжала ставить себе задачи не «по возрасту», а относительно собственных прошлых результатов.",
   source:"https://nsga.com/hurricane-hawkins-sets-first-ever-105-female-track-record/",events:[101,105]},
  {id:"kramer",name:"Айлин Крамер",age:110,country:"Австралия",cat:"culture",role:"танцовщица, хореограф, художница",chapter:7,level:1,wiki:"Eileen_Kramer",
   before:"Профессиональная танцовщица, затем десятилетия жила и работала в разных странах; в 80-х снова вернулась к хореографии.",
   turn:"Новые спектакли, книги и мемуары не останавливались до последних её дней.",
   after:"В 103 поставила и исполнила новую работу, в 109 выпустила новый мемуар и продолжала заниматься искусством до смерти в 110.",
   source:"https://eileen-kramer.com/home/about/",events:[103,109,110]},
];
