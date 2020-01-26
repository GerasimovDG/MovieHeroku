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
}

export interface FilmSessionTime {
  // [time: number]: string;
  time: number;
  cinema: string;
}
export interface FilmSession {
  [filmName: string]: FilmSessionTime[];
}

