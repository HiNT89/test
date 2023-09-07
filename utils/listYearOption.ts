const listYearOption = () => {
  const date = new Date();
  const year = date.getFullYear();
  const min = 2000;
  const listYear: number[] = [];
  for (let i = min; i <= year; i++) {
    listYear.push(i);
  }
  return listYear;
};
export default listYearOption;
