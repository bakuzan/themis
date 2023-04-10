export interface Title {
  Id: number;
  Name: string;
  StartYear: number;
  IsOneShot: number; // boolean 0 or 1
}

export interface TitleViewModel {
  id: number;
  name: string;
  startYear: number;
  isOneShot: boolean;
}
