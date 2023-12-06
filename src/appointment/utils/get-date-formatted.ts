export const getDateFormatted = (date: string) => {
  const dateObject = new Date(date);

  const day = dateObject.getDate().toString().padStart(2, "0");
  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const year = dateObject.getFullYear().toString();
  const hours = dateObject.getUTCHours().toString().padStart(2, "0");
  const minutes = dateObject.getUTCMinutes().toString().padStart(2, "0");

  return `${day}.${month}.${year}. ${hours}:${minutes}`;
};
