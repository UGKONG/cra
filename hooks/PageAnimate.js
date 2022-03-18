// 리액트 라우터 페이지 전환 애니메이션 함수
import React from "react";
import { motion } from "framer-motion";

export default function PageAnimate (props) {
  if (!props.children) return console.warn('애니메이션 할 요소가 없습니다.');
  let duration = props.duration || .3;
  let name = props.name;
  let _in;
  let _out;
  switch (name) {
    case 'fade':
      _in = { opacity: 1 }
      _out = { opacity: 0 }
      break;
    case 'slide-left':
      _in = { x: 0, opacity: 1 }
      _out = { x: 20, opacity: 0 }
      break;
    case 'slide-right':
      _in = { x: 0, opacity: 1 }
      _out = { x: -20, opacity: 0 }
      break;
    case 'slide-up':
      _in = { y: 0, opacity: 1 }
      _out = { y: 20, opacity: 0 }
      break;
    case 'slide-down':
      _in = { y: 0, opacity: 1 }
      _out = { y: -20, opacity: 0 }
      break;
    case 'scale':
      _in = { transform: 'scale(1)' }
      _out = { transform: 'scale(0)' }
      break;
    case 'scale-rotate':
      _in = { transform: 'scale(1) rotate(0deg)' }
      _out = { transform: 'scale(0) rotate(360deg)' }
      break;
    default:
      _in = { opacity: 1 }
      _out = { opacity: 0 }
  }
  return (
    <motion.main initial={_out} animate={_in} exit={_out} transition={{ duration }} >
      {props.children}
    </motion.main>
  )
}