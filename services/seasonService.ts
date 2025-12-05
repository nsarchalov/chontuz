import { SEASON_START_MONTH, SEASON_START_DAY, SEASON_END_MONTH, SEASON_END_DAY } from '../constants';

export const isSeasonOpen = (): boolean => {
  return true; // The sanatorium now operates year-round
};

export const getDaysDifference = (start: string, end: string): number => {
  const date1 = new Date(start);
  const date2 = new Date(end);
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays || 0;
};