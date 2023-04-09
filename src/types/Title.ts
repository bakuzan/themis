export interface Title {
  id: number;
  name: string;
  startYear: number;
  isOneShot: number; // boolean 0 or 1
}

export interface TitleViewModel {
  id?: number;
  name: string;
  startYear: number;
  isOneShot: boolean;
}
