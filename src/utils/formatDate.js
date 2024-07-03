// src/utils/formatDate.js

const formatDate = (inputDate) => {
  const date = new Date(inputDate);
  const year = date.getFullYear().toString().slice(2);
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month.toString()}월 ${day.toString()}일`;
};

export default formatDate;
