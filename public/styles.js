import { css } from 'styled-components';

export const textOverflow = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const wrap = css`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
`;

export const backgroundReset = css`
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: $size;
  background-position: center;
`;

