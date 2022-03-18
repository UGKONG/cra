import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import useTitle from '%/useTitle';
import { programName } from '~/static';

// Components
import Header from '@/pages/Common/Header';
import Home from '@/pages/Home';

export default function App() {
  useTitle(programName);

  return (
    <>
      <Name>{programName}</Name>
      <Header programName={programName} />
      <Routes>
        <Route path='/' element={<Home />} exact />
      </Routes>
    </>
  );
}

const Name = styled.h1`display: none`;