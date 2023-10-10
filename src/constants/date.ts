import { MonthName } from '@/types/MonthName';

export const monthNumberToNames = new Map<number, MonthName>([
  [1, { long: 'January', short: 'Jan' }],
  [2, { long: 'February', short: 'Feb' }],
  [3, { long: 'March', short: 'Mar' }],
  [4, { long: 'April', short: 'Apr' }],
  [5, { long: 'May', short: 'May' }],
  [6, { long: 'June', short: 'Jun' }],
  [7, { long: 'July', short: 'Jul' }],
  [8, { long: 'August', short: 'Aug' }],
  [9, { long: 'September', short: 'Sept' }],
  [10, { long: 'October', short: 'Oct' }],
  [11, { long: 'November', short: 'Nov' }],
  [12, { long: 'December', short: 'Dec' }]
]);
