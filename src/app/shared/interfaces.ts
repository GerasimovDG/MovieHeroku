export interface User {
  login: string;
  password: string;
}

export interface Film {
  id: number;
  img: string;
  name: string;
  genres: string[];
  producers: string[];
  actors: string[];
  description: string;
  rating: number;
}


export interface Theater {
  name: string;
  address: string;
  films: Film[];
  // filmScreeningPeriod: ScreeningPeriod[];
}

export interface FilmSessionTime {
  // [time: number]: string;
  time: number;
  cinema: string;
}
export interface FilmSession {
  [filmName: string]: FilmSessionTime[];
}

export interface ScreeningPeriod {
  cinema: string;
  periodStart: Date;
  periodEnd: Date;
}
export interface FilmScreeningPeriod {
  [filmName: string]: ScreeningPeriod[];
}

