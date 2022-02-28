import React from 'react';
import Styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useTitle } from '@react-hook';
import Header from '@/pages/Common/Header';
import Home from '@/pages/Home';

const App = () => {
  useTitle('준비가 완료되었습니다.');
  return (
    <Wrap>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} exact />
      </Routes>
    </Wrap>
  );
}

export default App;

const Wrap = Styled.main`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-flow: column;
  overflow: auto;

  div > * {
    text-align: center;
    display: block;
  }
`;