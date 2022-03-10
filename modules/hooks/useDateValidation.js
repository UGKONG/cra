import React, { useState } from "react";

// 날짜 Validation 함수
export default function useDateValidation (defaultDate = {}, callbackFn = () => {}) {
  const [date, setDate] = useState(defaultDate);
  let result = false;
  if (!date?.start || !date?.end) return [date, result, setDate];
  let start = date.start, end = date.end;
  if (start === '' || end === '' || typeof(start) !== 'string' || typeof(end) !== 'string') return [date, result, setDate];
  if (start.length !== 10 || end.length !== 10) return [date, result, setDate];

  let startDT = new Date(start);
  let endDT = new Date(end);
  startDT.setHours(0); endDT.setHours(0);
  startDT.setMinutes(0); endDT.setMinutes(0);
  startDT.setSeconds(0); endDT.setSeconds(0);
  startDT.setMilliseconds(0); endDT.setMilliseconds(0);
  let calc = endDT - startDT;
  result = calc >= 0;

  callbackFn(result);
  return [date, result, setDate];
}