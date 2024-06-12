export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  return `${year}-${month}-${day}`;
}

export const calculateAge = (born_date:string) => {
  const born_date_td = new Date(born_date);
  const actualDate = new Date();

  let age = actualDate.getFullYear() - born_date_td.getFullYear();
  const month = actualDate.getMonth() - born_date_td.getMonth();

  // Restar 1 año si la fecha de referencia es antes del cumpleaños de este año
  if (month < 0 || (month === 0 && actualDate.getDate() < born_date_td.getDate())) {
      age--;
  }

  return age;
}
