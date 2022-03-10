import React, { useState } from "react";

// 배열 아이템 value중 가장 높/낮은 Object 반환 함수
export default function useArrayMaxItem (defaultArray = [], keyName = '', option = false) {
  const [array, setArray] = useState(defaultArray);
  if (array.length === 0) return [[], setArray];
  if (!(keyName in array[0])) return [[], setArray];
  let sortArr = array.sort((a, b) => Number(a[keyName]) - Number(b[keyName]));
  let maxObj = sortArr[sortArr.length - 1];
  let minObj = sortArr[0];
  
  return [option ? minObj : maxObj, setArray];
}