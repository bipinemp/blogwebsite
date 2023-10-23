export const formatDate = (date: string) => {
  const createdAtDate = new Date(`${date}`);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const year = createdAtDate.getFullYear();
  const monthIndex = createdAtDate.getMonth();
  const day = createdAtDate.getDate();

  const formattedDate = `${months[monthIndex]} ${day} ${
    year !== 2023 ? "," + year : ""
  }`;

  return formattedDate;
};
