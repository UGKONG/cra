import React, { useState } from "react";

// GET파라미터 스트링 변환 함수
export default function useQueryString (defaultObject = {}) {
  const [query, setQuery] = useState(defaultObject);
  if (typeof(query) !== 'object' || !query) return [query, '', setQuery];
  let strArr = [];
  let keys = Object.keys(query);
  keys.forEach(key => strArr.push(key + '=' + query[key]));
  let result = strArr.join('&');
  return [query, result, setQuery];
}