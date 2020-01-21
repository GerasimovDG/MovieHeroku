import { User } from "../shared/interfaces";

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
    "Боевик", "Ужасы", "Триллер", "Фантастика", "Комедия", "Мелодрамма", "Мультфильм", "Приключения", "Детектив", "Драмма",
  ];
  static cinemas: string[] = [
    "Протон", "Соколенок", "Сентябрь", "Синема-сад",
  ];
}
