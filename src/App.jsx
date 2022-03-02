import React from 'react';
import Styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import { useTitle } from '#/hook';
import { programName } from '#/static';
import Header from '@/pages/Common/Header';
import Home from '@/pages/Home';

const App = () => {
  useTitle(programName);
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