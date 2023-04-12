export interface Title {
  Id: number;
  Name: string;
  StartYear: string; // YYYY
  IsOneShot: number; // boolean 0 or 1
}

export interface TitleViewModel {
  id: number;
  name: string;
  startYear: number;
  isOneShot: boolean;
}
