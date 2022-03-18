import React, { useState } from "react";

// 숫자 포맷 함수
export default function useNumber (defaultValue) {
  const [value, setValue] = useState(String(defaultValue));
  if (value === undefined) return;
  let result = value.replaceAll(',', '').replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return [result, setValue];
}