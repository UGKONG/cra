import React, { useState } from "react";

// 복호화 하는 함수
export default function usePwDecoding (defaultStr = '') {
  return decodeURIComponent(escape(atob(defaultStr)));
}