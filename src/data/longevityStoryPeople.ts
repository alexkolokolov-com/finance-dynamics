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
    turn:"Первую книгу написала в онкологической реанимации — затем создала более 270 детективов.",
   after:"Дальше — более двухсот книг и первые места по тиражам в России.",
   source:"https://ru.wikipedia.org/wiki/Дарья_Донцова",events:[47]},
  {id:"freeman",name:"Морган Фриман",age:50,country:"США",cat:"culture",role:"актёр",field:"Кино",chapter:4,level:3,wiki:"Morgan_Freeman",
   before:"Сорок лет театра, эпизодов и детской телепрограммы почти без известности в кино.",
    turn:"Роль в «Уличном умнике» принесла первую номинацию на «Оскар» и известность.",
   after:"Дальше — «Побег из Шоушенка», «Семь», «Малышка на миллион» и статус одного из самых востребованных актёров.",
   source:"https://www.britannica.com/biography/Morgan-Freeman",events:[50]},
  {id:"kroc",name:"Рэй Крок",age:52,country:"США",cat:"business",role:"создатель системы McDonald's",field:"Общественное питание",chapter:4,level:2,wiki:"Ray_Kroc",
   before:"Десятилетиями работал продавцом, в том числе продавал миксеры для молочных коктейлей.",
   turn:"Продавал миксеры, увидел ресторан братьев Макдональд и построил вокруг него глобальную франшизу.",
   after:"Создал McDonald's System, Inc., а позднее выкупил права на компанию.",
   source:"https://corporate.mcdonalds.com/corpmcd/our-company/who-we-are/our-history.html",events:[52,58]},
  {id:"tetyukhin",name:"Владислав Тетюхин",age:60,country:"Россия",cat:"business",role:"генеральный директор ВСМПО-АВИСМА",field:"Металлургия",chapter:4,level:2,lang:"ru",wiki:"Тетюхин,_Владислав_Валентинович",
    before:"Инженер-металлург, прошёл путь от мастера до руководителя титанового производства.",
    turn:"Вернулся на кризисный завод и вывел его в мировые лидеры титана.",
    after:"Позже вложил личное состояние в строительство медицинского центра в Нижнем Тагиле.",
    source:"https://www.kommersant.ru/doc/3940311",events:[60,80]},
  {id:"sanders",name:"Харланд Сандерс",age:62,country:"США",cat:"business",role:"основатель KFC",field:"Общественное питание",chapter:4,level:1,wiki:"Colonel_Sanders",
    before:"Сменил множество профессий и держал придорожную закусочную.",
    turn:"После закрытия закусочной начал продавать ресторанам франшизу своего рецепта курицы.",
    after:"Превратил собственный рецепт и образ полковника в международный бренд.",
    source:"https://global.kfc.com/our-history",events:[62]},
  {id:"leonov",name:"Павел Леонов",age:71,country:"Россия",cat:"culture",role:"художник наивного искусства",field:"Живопись",chapter:4,level:3,lang:"ru",wiki:"Леонов,_Павел_Петрович_(художник)",
    before:"Работал на заводах и стройках, живопись надолго оставил.",
    turn:"После долгого перерыва вернулся к живописи и получил международное признание.",
    after:"Стал одним из ведущих представителей российского наивного искусства.",
    source:"https://artinvestment.ru/invest/artistofweek/20200504_leonov_artist.html",events:[71]},
  {id:"mandela",name:"Нельсон Мандела",age:75,country:"ЮАР",cat:"state",role:"первый президент ЮАР",field:"Государство",chapter:4,level:1,wiki:"Nelson_Mandela",
   before:"Двадцать семь лет в тюрьме, освобождение и годы переговоров о конце апартеида.",
   turn:"После двадцати семи лет заключения возглавил страну и мирно перевёл её к новой власти.",
   after:"Провёл ЮАР через мирный переход власти и отказался от второго срока.",
   source:"https://www.nelsonmandela.org/biography",events:[75]},
  {id:"moses",name:"Анна Мозес",age:78,country:"США",cat:"culture",role:"художница",field:"Живопись",chapter:4,level:2,wiki:"Grandma_Moses",
    before:"Вела ферму и занималась рукоделием, не получая художественного образования.",
    turn:"Из-за артрита оставила рукоделие — к восьмидесяти её картины показывали в Нью-Йорке.",
    after:"Стала одной из самых известных американских художниц наивного искусства.",
    source:"https://www.britannica.com/biography/Grandma-Moses",events:[78]},



  // 80–120: активная деятельность
  {id:"etush",name:"Владимир Этуш",age:80,country:"Россия",cat:"culture",role:"актёр, театральный педагог",chapter:6,level:1,lang:"ru",wiki:"Этуш,_Владимир_Абрамович",
   before:"Ведущий актёр театра Вахтангова, знакомый зрителю по комедиям Гайдая.",
    turn:"До восьмидесяти лет руководил институтом Щукина — и продолжал играть в театре.",
   after:"Ещё через пятнадцать лет выходил на сцену Вахтангова и снимался в кино.",
   source:"https://vakhtangov.ru/person/vladimir-etush/",events:[80,95]},
  {id:"piotrovsky",name:"Михаил Пиотровский",age:81,country:"Россия",cat:"culture",role:"директор Эрмитажа",chapter:6,level:2,lang:"ru",wiki:"Пиотровский,_Михаил_Борисович",
   before:"Востоковед и исследователь, много лет работал в Институте востоковедения.",
   turn:"Руководит Эрмитажем больше тридцати лет и превратил его в один из главных музеев мира.",
   after:"Профессиональная деятельность остаётся институциональной и публичной — не как «хобби после пенсии», а как руководство большой организацией.",
   source:"https://www.hermitagemuseum.org/about/hermitage_director",events:[81]},
  {id:"bloomberg",name:"Майкл Блумберг",age:84,country:"США",cat:"business",role:"основатель Bloomberg",chapter:6,level:1,wiki:"Michael_Bloomberg",
   before:"Построил Bloomberg L.P. — компанию финансовой информации для всего рынка.",
   turn:"Три срока был мэром Нью-Йорка — потом вернулся в компанию и занялся климатической филантропией.",
   after:"Пример поздней карьеры, где бизнес-капитал конвертируется в общественные и международные проекты.",
   source:"https://www.bloomberg.org/annualreport/",events:[84]},
  {id:"pozner",name:"Владимир Познер",age:92,country:"Россия / Франция / США",cat:"culture",role:"журналист",chapter:6,level:2,lang:"ru",wiki:"Познер,_Владимир_Владимирович",
   before:"Более полувека работает в журналистике, телевидении и документальных проектах.",
   turn:"Профессия пережила смену каналов: от телевидения к книгам, лекциям и цифровым форматам.",
   after:"Его траектория показывает, как профессия может пережить смену каналов — от телевидения к книгам, публичным выступлениям и цифровым форматам.",
   source:"https://www.rbc.ru/life/news/66069df89a7947b9b6743422",events:[92]},
  {id:"buffett",name:"Уоррен Баффет",age:96,country:"США",cat:"business",role:"председатель Berkshire Hathaway",chapter:6,level:3,wiki:"Warren_Buffett",
   before:"Более полувека совмещал функции CEO и председателя Berkshire Hathaway.",
   turn:"Передал управление Berkshire Hathaway преемнику — остался председателем совета директоров и крупнейшим акционером.",
   after:"Очень наглядная модель смены роли: меньше операционной нагрузки, сохранение институционального влияния.",
   source:"https://www.sec.gov/Archives/edgar/data/1067983/000119312526083899/brka-20251231.htm",events:[96]},

  // 100+: активность и субъектность
  {id:"orthmann",name:"Вальтер Ортманн",age:100,country:"Бразилия",cat:"business",role:"менеджер по продажам",chapter:7,level:1,wiki:"Walter_Orthmann",
   before:"Начал работать в текстильной компании в 15 лет.",
   turn:"Больше восьмидесяти лет в одной компании — мировой рекорд продолжительности карьеры.",
   after:"Редкий пример профессиональной, а не только бытовой активности после столетия.",
   source:"https://www.guinnessworldrecords.com/news/2022/4/100-year-old-brazilian-breaks-record-after-84-years-at-same-company-701664",events:[100]},
  {id:"vandyk",name:"Дик Ван Дайк",age:100,country:"США",cat:"culture",role:"актёр и автор",chapter:7,level:2,wiki:"Dick_Van_Dyke",
   before:"Телевидение, кино, сцена — карьера длиной более семи десятилетий.",
   turn:"К столетию выпустил новую книгу и по-прежнему тренируется каждый день.",
   after:"Здесь важна не «вечная работа», а сохранение режима, публичности и способности создавать новый материал.",
   source:"https://www.aarp.org/entertainment/celebrities/dick-van-dyke-inversion-table.html",events:[100]},
  {id:"marchand",name:"Робер Маршан",age:105,country:"Франция",cat:"sport",role:"велогонщик",chapter:7,level:3,wiki:"Robert_Marchand_(cyclist)",
   before:"Начал серьёзно заниматься велоспортом уже в зрелом возрасте.",
   turn:"Установил часовой рекорд в категории, созданной специально для его возраста.",
   after:"Его пример интересен именно институционально: спортивная система создала новую возрастную категорию, потому что старый возрастной предел перестал описывать реальность.",
   source:"https://www.guinnessworldrecords.com/world-records/465166-oldest-competitive-cyclist",events:[105]},
];
