import React, { useState } from 'react';
// 연락처 하이픈 추가 함수
export default function useHyphen (defaultValue) {
  const [value, setValue] = useState(defaultValue);
  if (value === undefined) return;
  let result = value.replace(/[^0-9]/g, "")
                    .replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/,"$1-$2-$3")
                    .replace("--", "-");
  return [result, setValue];
}