import React from 'react';
import Styled from 'styled-components';
import { PageAnimate } from '@hook';
import { useSelector, useDispatch } from 'react-redux';
import { AiFillApi } from 'react-icons/ai';

const Home = () => {
  const dispatch = useDispatch();
  const num = useSelector(state => state.number);
  const up = () => dispatch({ type: 'setNumber', payload: num + 1 });
  const down = () => dispatch({ type: 'setNumber', payload: num - 1 });

  return (
    <PageAnimate name='slide-up'>
      <Wrap>
        <h1><span>React APP</span>이 준비되었습니다</h1>
        <br />
        <AiFillApi size={40} color='orange' />
        <b>Num: { num }</b>
        <p>
          <button onClick={up}>UP</button>
          <button onClick={down}>DOWN</button>
        </p>
      </Wrap>
    </PageAnimate>
  )
}

export default Home;

const Wrap = Styled.section`
  text-align: center;

  span {
    color: #5a02aa;
  }
  b {
    display: block;
    margin-top: 20px;
    color: red;
  }
  p {
    padding: 30px 0 20px;
    font-size: 16px;
    font-weight: 500;
  }
`;