import React from 'react';
import { NavLink } from 'react-router-dom';
import Styled from 'styled-components';

const Header = () => {
  return (
    <Wrap>
      <NavLink to='/'>Home</NavLink>
    </Wrap>
  )
}

export default Header;

const Wrap = Styled.header`
  margin-bottom: 50px;
  a {
    color: #ddd;
    font-weight: 500;
    &:hover { color: #ccc }
    &:active { color: #bbb }
    &.active { color: #5a02aa }
  }
`;