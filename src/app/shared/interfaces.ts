export interface User {
  name?: string;
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
}

export interface Hall {
  price: number;
  places: number[][];
}
export interface FilmSessionTime {
  time: number;
  cinema: string;
  hall: Hall;
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


export interface BookingInfo {
  film: Film;
  session: FilmSessionTime;
}




