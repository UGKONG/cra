import React, { useState, useEffect } from 'react';

// 브라우저 타이틀 변경 함수
export default function useTitle (defaultTitle = '') {
  const [title, setTitle] = useState(defaultTitle);
  useEffect(() => {
    const htmlTitle = document.querySelector('title');
    htmlTitle.innerText = title;
  }, [title]);
  return setTitle;
}