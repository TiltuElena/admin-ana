import { Workplace } from './workplace';

export interface Room {
  id: number;
  name_en: string;
  name_ro: string;
  name_ru: string;
  area: string;
  length: string;
  width: string;
  description_en: string;
  description_ro: string;
  description_ru: string;
  floor_number: number;
  workplaces: Workplace[];
}
