import React, { useState } from "react";

// 배열의 프로퍼티 value 정렬 후 리스트 반환 함수
export default function useOrderArr (defaultArray = [], prop = '') {
  const [array, setArray] = useState(defaultArray);
  if (array.length < 2) return [array, setArray];
  let isJustArray = typeof(array[0]) !== 'object';

  if (isJustArray) {
    let type = typeof(array[0]);
    if (type === 'string') return [array.sort((a, b) => a < b ? -1 : a > b ? 1 : 0), setArray];
    if (type === 'number') return [array.sort((a, b) => Number(a) - Number(b)), setArray];
  } else {
    if (!prop) return [array, setArray];
    let type = typeof(array[0][prop]);
    if (type === 'string') return [array.sort((a, b) => a[prop] < b[prop] ? -1 : a[prop] > b[prop] ? 1 : 0), setArray];
    if (type === 'number') return [array.sort((a, b) => Number(a[prop]) - Number(b[prop])), setArray];
  }
  return [array, setArray];
}