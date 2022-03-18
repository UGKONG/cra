import React, { useState } from "react";

// 나이계산 함수
export default function useAge (defaultBirth = null) {
  const [birth, setBirth] = useState(defaultBirth);
  if (!birth || typeof(birth) !== 'string' || birth.length < 6) return console.warn('dd');
  if (birth.length !== 6 && birth.length !== 8) return console.warn('dd');
  let now = new Date();
  let date = '';
  let birthDate;
  let result;
  
  if (birth.length === 8) {
    let y = birth.slice(0, 4);
    date = `${y}-01-01`;
    birthDate = new Date(date);
    result = now.getFullYear() - birthDate.getFullYear() + 1;
  } else if (birth.length === 6) {
    let _nowY = Number(String(now.getFullYear()).slice(2, 4));
    let _birthY = Number(birth.slice(0, 2));
    let nowY = Number(String(now.getFullYear()).slice(0, 2));
    let firstNum = String(_birthY >= _nowY ? nowY - 1 : nowY);
    _birthY = _birthY === 0 ? '00' : (_birthY < 10 ? '0' + _birthY : _birthY);
    date = `${firstNum + _birthY}-01-01`;
    birthDate = new Date(date);
    result = now.getFullYear() - birthDate.getFullYear() + 1;
  } else {
    result = null;
  }
  
  return [birth, result, setBirth];
}