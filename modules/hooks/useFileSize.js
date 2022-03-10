import React, { useState } from "react";

// 파일 사이즈 반환 함수
export default function useFileSize (defaultSize) {
  const [size, setSize] = useState(defaultSize);
  if (typeof(size) !== 'number') return [size, 'Not Number Type', setSize];
  if (size === 0) return [0, '0Byte', setSize];
  let extList = ['Byte', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  let result = 0;
  let ext = '';
  let n = 1024;

  for(let i = 9; i >= 0; i--) {
    if (size >= n ** i) {
      result = size;
      for (let ii = i; ii > 0; ii--) {
        result = result / n;
      }
      ext = extList[i];
      break;
    }
  }
  
  result = result.toFixed(2) + ext;
  return [size, result, setSize];
}