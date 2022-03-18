import React from 'react';
import styled from 'styled-components';
import PageAnimate from '%/PageAnimate';

export default function Home() {
  return (
    <PageAnimate name='slide-up'>
      <Img src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xMS41IC0xMC4yMzE3NCAyMyAyMC40NjM0OCI+CiAgPHRpdGxlPlJlYWN0IExvZ288L3RpdGxlPgogIDxjaXJjbGUgY3g9IjAiIGN5PSIwIiByPSIyLjA1IiBmaWxsPSIjNjFkYWZiIi8+CiAgPGcgc3Ryb2tlPSIjNjFkYWZiIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIi8+CiAgICA8ZWxsaXBzZSByeD0iMTEiIHJ5PSI0LjIiIHRyYW5zZm9ybT0icm90YXRlKDYwKSIvPgogICAgPGVsbGlwc2Ugcng9IjExIiByeT0iNC4yIiB0cmFuc2Zvcm09InJvdGF0ZSgxMjApIi8+CiAgPC9nPgo8L3N2Zz4K" alt="React Logo" style={{ width: 200, height: 200, display: 'block', margin: '150px auto 40px' }} />
      <H2><span style={{ color: '#50c8e9' }}>React</span>가 준비되었습니다.</H2>
    </PageAnimate>
  )
}

const Img = styled.img`
  @keyframes rotate {
    0% { transform: rotate(0deg) }
    100% { transform: rotate(360deg) }
  }
  animation: rotate infinite 5s linear;
`;
const H2 = styled.h2`
  text-align: center;
  color: #fff;
  font-weight: 500;
  letter-spacing: 1px;
`;