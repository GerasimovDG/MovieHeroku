import { Film, FilmScreeningPeriod, FilmSession, Theater, User } from "../shared/interfaces";

export class DataLists {
  static users: User[] = [
    {
      login: "admin",
      password: "admin1"
    },
    {
      login: "Baget",
      password: "123456"
    },
    {
      login: "BigBro1991",
      password: "Qwerty123"
    },
    {
      login: "test",
      password: "test111"
    },
  ];
  static genres: string[] = [
    "Все жанры", "Боевик", "Ужасы", "Триллер", "Фантастика", "Комедия", "Мелодрамма", "Мультфильм", "Приключения", "Детектив", "Драмма",
  ];


  static films: Film[] = [
    {
      id: 1,
      img: "badboys.jpg",
      name: "Плохие парни навсегда",
      genres: ["боевик", "комедия", "триллер", "криминал"],
      producers: ["Билал Фалла", "Адиль Эль Арби"],
      actors: [ "Уилл Смит", "Мартин Лоуренс", "Ванесса Энн Хадженс", "Александр Людвиг", "Паола Нуньес", "Майкл Бэй", "Кейт дель Кастильо",
        "Джо Пантольяно", "Чарльз Мелтон", "Джейкоб Скипио",
      ],
      description: "Детективы Майк Лоури и Маркус Бёрнетт снова в деле! Правда, их отстраняют от всех операций, " +
        "но разве отчаянных друзей когда-нибудь что-либо останавливало? Ведь на этот раз на Майка открывает охоту некто из его прошлой жизни. " +
        "Так что парням придется отжечь по полной!",
      rating: 7.076,
    },
    {
      id: 2,
      img: "lighthouse.jpg",
      name: "Маяк",
      genres: ["ужасы", "фэнтези", "драма"],
      producers: ["Роберт Эггерс"],
      actors: [ "Роберт Паттинсон", "Уиллем Дефо", "Валерия Караман"],
      description: "1890-е годы, где-то неподалёку от побережья Новой Англии. Молодой человек Эфраим Уинслоу приезжает на отдалённый остров " +
        "работать новым помощником смотрителя маяка, хромоногого и бородатого любителя выпить Томаса Уэйка. Тот обращается с подчинённым как с " +
        "личным рабом и запрещает ему подниматься на сам маяк и управлять светом. Эфраима не отпускает собственное прошлое, так поначалу отказывавшийся " +
        "от алкоголя парень всё чаще прикладывается к бутылке, и вскоре на каменистом острове — то ли ему мерещится, то ли в самом деле — начинает происходить " +
        "всякая чертовщина.",
      rating: 7.341,
    },
    {
      id: 3,
      img: "Gisaengchung.jpg",
      name: "Паразиты",
      genres: ["драма"],
      producers: ["Пон Джун-хо"],
      actors: [ "Сон Кан-хо", "Ли Сон-гюн", "Чо Ё-джон", "Чхве У-щик", "Пак Со-дам", "Чан Хе-джин", "Чон Джи-со",
        "Чон Хён-джун", "Ли Джон-ын", "Пак Со-джун",
      ],
      description: "Обычное корейское семейство жизнь не балует. Приходится жить в сыром грязном полуподвале, воровать интернет у соседей и перебиваться случайными" +
        " подработками. Однажды друг сына семейства, уезжая на стажировку за границу, предлагает тому заменить его и поработать репетитором у старшеклассницы в " +
        "богатой семье Пак. Подделав диплом о высшем образовании, парень отправляется в шикарный дизайнерский особняк и производит на хозяйку дома хорошее " +
        "впечатление. Тут же ему в голову приходит необычный план по трудоустройству сестры.",
      rating: 8.1,
    },
    {
      id: 4,
      img: "Richard Jewell.jpg",
      name: "Дело Ричарда Джуэлла",
      genres: ["драма"],
      producers: ["Клинт Иствуд"],
      actors: [ "Сэм Рокуэлл" , "Оливия Уайлд" , "Джон Хэмм" , "Кэти Бейтс" , "Нина Арианда"],
      description: "История Ричарда Джуэлла, который работал охранником на Олимпийских играх 1996 года в Атланте и, заметив рюкзак с бомбой, " +
        "сумел вовремя эвакуировать людей. Однако всеобщая благодарность длилась недолго: через несколько дней Джуэлл сам превратился в главного подозреваемого" +
        " и жертву уничижительной травли со стороны СМИ.",
      rating: 7.736,
    },
    {
      id: 5,
      img: "frozen2.jpg",
      name: "Холодное сердце 2",
      genres: ["мультфильм", "комедия", "приключения", "мизюкл"],
      producers: ["Дженнифер Ли", "Крис Бак"],
      actors: [ "Джонатан Грофф", "Кристен Белл", "Эван Рэйчел Вуд", "Стерлинг К. Браун", "Джош Гад",
        "Джейсон Риттер", "Марта Плимптон", "Идина Мензел", "Альфред Молина",
      ],
      description: "Анна, Эльза, Кристоф, его верный олень Свен и никогда не унывающий снеговик Олаф должны будут покинуть уютное королевство Эренделл " +
        "и отправиться ещё дальше на север, в путешествие, которое приведет их к истокам древних легенд и поможет раскрыть тайны, касающиеся прошлого их родной " +
        "страны.",
      rating: 7.2,
    },
    {
      id: 6,
      img: "Holop.jpg",
      name: "Холоп",
      genres: ["комедия"],
      producers: ["Клим Шипенко"],
      actors: [ "Милош Бикович", "Александра Бортич", "Александр Самойленко", "Иван Охлобыстин", "Мария Миронова", "Олег Комаров",
        "Ольга Дибцева", "Кирилл Нагиев", "Сергей Соцердотский", "Софья Зайка",
      ],
      description: "Эгоистичный мажор Гриша в один не очень прекрасный день после аварии приходит в себя… в 1860 году в барской усадьбе. " +
        "Теперь он — обычный холоп без связей и связи: о смартфонах здесь не слышали, а все вокруг него — крепостные. Грише предстоит пройти непростой путь, " +
        "чтобы из наглого сынка богатых родителей превратиться в человека, который умеет ценить простые вещи, умеет дружить, ну и, конечно, любить.",
      rating: 7.094,
    },
    {
      id: 7,
      img: "Knives Out.jpg",
      name: "Достать ножи",
      genres: ["детектив", "комедия", "драма", "криминал"],
      producers: ["Райан Джонсон"],
      actors: [ "Дэниэл Крэйг", "Ана де Армас", "Крис Эванс", "Джейми Ли Кёртис", "Майкл Шеннон", "Дон Джонсон", "Тони Коллетт",
        "Лакит Стэнфилд", "Кристофер Пламмер", "Кэтрин Лэнгфорд",
      ],
      description: "Когда сразу после празднования 85-летия известного автора криминальных романов Харлана Тромби виновника торжества " +
        "находят мёртвым, за расследование берётся обаятельный и дотошный частный детектив Бенуа Блан. Ему предстоит распутать тугую сеть уловок и корыстной лжи," +
        " которой его опутывают члены неблагополучной семьи Харлана и преданный ему персонал.",
      rating: 7.829,
    },
  ];


  static  cinemas: Theater[] = [
    {
      name: "Протон",
      address: "просп. Гагарина, 98, Нижний Новгород, Нижегородская обл., 603009",
      films: [
        DataLists.films.find(film => film.name.toLowerCase() === "Плохие парни навсегда".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Холодное сердце 2".toLowerCase()),
      ],
      // filmScreeningPeriod: [
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Плохие парни навсегда".toLowerCase()),
      //     periodStart: new Date(2020, 1, 23),
      //     periodEnd: new Date(2020, 3, 5),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Холодное сердце 2".toLowerCase()),
      //     periodStart: new Date(2019, 12, 28),
      //     periodEnd: new Date(2020, 3, 10),
      //   },
      // ],
    },
    {
      name: "Соколенок",
      address: " Большая Покровская ул., 39, лит. А, Нижний Новгород, Нижегородская обл., 603000",
      films: [
        DataLists.films.find(film => film.name.toLowerCase() === "Маяк".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Холодное сердце 2".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Дело Ричарда Джуэлла".toLowerCase()),
      ],
      // filmScreeningPeriod: [
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Маяк".toLowerCase()),
      //     periodStart: new Date(2020, 1, 16),
      //     periodEnd: new Date(2020, 3, 16),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Холодное сердце 2".toLowerCase()),
      //     periodStart: new Date(2019, 12, 28),
      //     periodEnd: new Date(2020, 3, 16),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Дело Ричарда Джуэлла".toLowerCase()),
      //     periodStart: new Date(2020, 1, 9),
      //     periodEnd: new Date(2020, 3, 9),
      //   },
      // ],
    },
    {
      name: "Сентябрь",
      address: "Нижний Новгород, Б.Покровская, 901ф, 6064400",
      films: [
        DataLists.films.find(film => film.name.toLowerCase() === "Достать ножи".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Холоп".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Плохие парни навсегда".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Паразиты".toLowerCase()),
      ],
      // filmScreeningPeriod: [
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Достать ножи".toLowerCase()),
      //     periodStart: new Date(2019, 11, 28),
      //     periodEnd: new Date(2020, 3, 7),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Холоп".toLowerCase()),
      //     periodStart: new Date(2019, 12, 26),
      //     periodEnd: new Date(2020, 3, 26),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Плохие парни навсегда".toLowerCase()),
      //     periodStart: new Date(2020, 1, 23),
      //     periodEnd: new Date(2020, 3, 23),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Паразиты".toLowerCase()),
      //     periodStart: new Date(2020, 1, 25),
      //     periodEnd: new Date(2020, 3, 25),
      //   },
      // ],
    },
    {
      name: "Синема-6",
      address: "Нижний Новгород, ул. Родионова, 187в, ТРЦ «Фантастика»,",
      films: [
        DataLists.films.find(film => film.name.toLowerCase() === "Достать ножи".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Холоп".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Плохие парни навсегда".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Маяк".toLowerCase()),
        DataLists.films.find(film => film.name.toLowerCase() === "Холодное сердце 2".toLowerCase()),
      ],
      // filmScreeningPeriod: [
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Достать ножи".toLowerCase()),
      //     periodStart: new Date(2019, 11, 28),
      //     periodEnd: new Date(2020, 3, 7),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Холоп".toLowerCase()),
      //     periodStart: new Date(2019, 12, 26),
      //     periodEnd: new Date(2020, 3, 26),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Плохие парни навсегда".toLowerCase()),
      //     periodStart: new Date(2020, 1, 23),
      //     periodEnd: new Date(2020, 3, 23),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Маяк".toLowerCase()),
      //     periodStart: new Date(2020, 1, 16),
      //     periodEnd: new Date(2020, 3, 16),
      //   },
      //   { film: DataLists.films.find(film => film.name.toLowerCase() === "Холодное сердце 2".toLowerCase()),
      //     periodStart: new Date(2019, 12, 28),
      //     periodEnd: new Date(2020, 3, 12),
      //   },
      // ],
    },
  ];

  static filmsessions: FilmSession = {
    "Достать ножи" : [
      { time: 40500, cinema: "Синема-6", },
      { time: 55500, cinema: "Синема-6", },
      { time: 60600, cinema: "Синема-6", },
      { time: 50400, cinema: "Сентябрь", },
      { time: 80400, cinema: "Сентябрь", },
    ],
    "Холоп" : [
      { time: 41600, cinema: "Синема-6", },
      { time: 53500, cinema: "Синема-6", },
      { time: 65600, cinema: "Синема-6", },
      { time: 30500, cinema: "Сентябрь", },
      { time: 45400, cinema: "Сентябрь", },
    ],
    "Плохие парни навсегда" : [
      { time: 47400, cinema: "Протон", },
      { time: 57000, cinema: "Протон", },
      { time: 66600, cinema: "Протон", },
      { time: 79200, cinema: "Протон", },
      { time: 47400, cinema: "Сентябрь", },
      { time: 57600, cinema: "Сентябрь", },
      { time: 32400, cinema: "Синема-6", },
      { time: 43200, cinema: "Синема-6", },
      { time: 79200, cinema: "Синема-6", },
    ],
    "Холодное сердце 2" : [
      { time: 36000, cinema: "Протон", },
      { time: 42000, cinema: "Протон", },
      { time: 32400, cinema: "Соколенок", },
      { time: 46800, cinema: "Соколенок", },
      { time: 68400, cinema: "Соколенок", },
      { time: 36000, cinema: "Синема-6", },
      { time: 46800, cinema: "Синема-6", },
    ],
    "Маяк" : [
      { time: 39600, cinema: "Соколенок", },
      { time: 61200, cinema: "Соколенок", },
      { time: 75600, cinema: "Соколенок", },
      { time: 3600, cinema: "Синема-6", },
      { time: 82800, cinema: "Синема-6", },
    ],
    "Паразиты" : [
      { time: 600, cinema: "Сентябрь", },
      { time: 36000, cinema: "Сентябрь", },
      { time: 61200, cinema: "Сентябрь", },
    ],
    "Дело Ричарда Джуэлла" : [
      { time: 50400, cinema: "Соколенок", },
      { time: 82800, cinema: "Соколенок", },
    ],
    // "Достать ножи": {
    //   40500: "Синема-6", 55500: "Синема-6", 60600: "Синема-6",
    //   50400: "Сентябрь", 80400: "Сентябрь",
    // },
    // "Холоп": {
    //   41600: "Синема-6", 53500: "Синема-6", 65600: "Синема-6",
    //   30500: "Сентябрь", 45400: "Сентябрь",
    // },
    // "Плохие парни навсегда": {
    //   55000: "Синема-6", 67600: "Синема-6",
    //   55001: "Сентябрь", 67601: "Сентябрь",
    //   40500: "Протон", 55500: "Протон", 60600: "Протон",
    // },
    // "Маяк": {
    //   47500: "Синема-6", 63600: "Синема-6",
    //   55001: "Соколенок", 67601: "Соколенок",
    // },
  };


  static filmScreeningPeriod: FilmScreeningPeriod = {
    "Достать ножи": [
      {cinema: "Сентябрь", periodStart: new Date("2019-11-28"), periodEnd: new Date("2020-03-07") },
      {cinema: "Синема-6", periodStart: new Date("2019-11-28"), periodEnd: new Date("2020-03-07") },
    ],
    "Холоп": [
      {cinema: "Сентябрь", periodStart: new Date("2019-12-26"), periodEnd: new Date("2020-03-26") },
      {cinema: "Синема-6", periodStart: new Date("2019-12-26"), periodEnd: new Date("2020-03-26") },
    ],
    "Плохие парни навсегда": [
      {cinema: "Протон", periodStart: new Date("2020-01-23"), periodEnd: new Date("2020-03-05") },
      {cinema: "Сентябрь", periodStart: new Date("2020-01-23"), periodEnd: new Date("2020-03-23") },
      {cinema: "Синема-6", periodStart: new Date("2020-01-23"), periodEnd: new Date("2020-03-23") },
    ],
    "Холодное сердце 2": [
      {cinema: "Протон", periodStart: new Date("2019-12-28"), periodEnd: new Date("2020-03-10") },
      {cinema: "Соколенок", periodStart: new Date("2019-12-28"), periodEnd: new Date("2020-03-16") },
      {cinema: "Синема-6", periodStart: new Date("2019-12-28"), periodEnd: new Date("2020-03-12") },
    ],
    "Маяк": [
      {cinema: "Соколенок", periodStart: new Date("2020-01-16"), periodEnd: new Date("2020-03-16") },
      {cinema: "Синема-6", periodStart: new Date("2020-01-16"), periodEnd: new Date("2020-03-16") },
    ],
    "Паразиты": [
      {cinema: "Сентябрь", periodStart: new Date("2020-01-25"), periodEnd: new Date("2020-03-25") },
    ],
    "Дело Ричарда Джуэлла": [
      {cinema: "Сентябрь", periodStart: new Date("2020-01-09"), periodEnd: new Date("2020-03-09") },
    ],
  };

}
