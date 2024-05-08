export const convertDateFormat = (inputDate: string): string => {
  // Create a new date object from the input string
  let date = new Date(inputDate);

  // Extract the day, month and year from the date object
  let day = String(date.getDate()).padStart(2, "0");
  let month = String(date.getMonth() + 1).padStart(2, "0");
  let year = String(date.getFullYear()).slice(-2);

  // Return the date in "dd.mm.yy" format
  return `${day}.${month}.${year}`;
};

export const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

export const toISOStringLocal = (d: Date) => {
  return new Date(d.getTime() - d.getTimezoneOffset() * 60000)
    .toISOString()
    .slice(0, -5);
};
