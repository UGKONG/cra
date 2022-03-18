import React, { useState } from 'react';

// 암호화 하는 함수
export default function usePwEncoding (defaultStr = '') {
  const [str, setStr] = useState(defaultStr);
  let result = btoa(unescape(encodeURIComponent(str)));
  return [str, result, setStr];
}