import React from "react";


export default function Calendar() {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `0${date}${'/'}${month < 10 ? `0${month}` : `${month}`}${'/'}${year}`;
}
