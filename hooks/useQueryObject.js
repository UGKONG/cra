import React, { useState } from "react";

// GET파라미터 객체 변환 함수
export default function useQueryObject (defaultString = '') {
  const [query, setQuery] = useState(defaultString);
  if (typeof(defaultString) !== 'string') return [null, null, null];
  let queryString = query.indexOf('?') > -1 ? query.split('?')[1] : query;
  let resultObj = {};
  let stringArr = [];
  
  if (queryString.indexOf('&') > -1) {
    stringArr = queryString.split('&');
  } else {
    stringArr[0] = queryString;
  }
  stringArr.forEach(data => {
    let [key, value] = data.split('=');
    resultObj[key] = value;
  });
  return [query, resultObj, setQuery];
}