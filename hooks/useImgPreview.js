import React, { useState } from "react";

// 이미지 미리보기 함수
export default function useImgPreview () {
  const [img, setImg] = useState([]);
  if (!img || img.length === 0) return [[], setImg];
  let result = [];
  if (img.length === 1) {
    result = [URL.createObjectURL(img[0])];
  } else {
    result = [];
    for(let i = 0; i < img.length; i++) {
      result.push(URL.createObjectURL(img[i]));
    }
  }
  return [result, setImg];
}