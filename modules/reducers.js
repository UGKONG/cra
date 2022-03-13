const number = (state = 0, { type, payload }) => {
  switch (type) {
    case 'setNumber':
      return state = payload ?? state;
    default:
      return state;
  }
}


const result = {
  number,
}

export default result;