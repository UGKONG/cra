import React, { useState } from "react";
import useDate from "./useDate";

// 해당 월의 첫날짜, 끝날짜, 기본날짜, 첫날요일 리턴 함수
export default function useMonthSpan (defaultDate) {
  let startDay = null, startDate = null, endDate = null;
  const [date, setDate] = useState(defaultDate ?? new Date());
  let dateObj = new Date(date);
  dateObj.setDate(1);
  startDay = dateObj.getDay();
  startDate = useDate(dateObj, 'date');
  dateObj.setMonth(dateObj.getMonth() + 1);
  dateObj.setDate(1);
  dateObj.setDate(dateObj.getDate() - 1);
  endDate = useDate(dateObj, 'date');

  return { startDay, startDate, endDate, setDate, date };
}