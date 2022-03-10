const number = (state = 0, { type, payload }) => {
  switch (type) {
    case 'setNumber':
      return state = payload ?? state;
    default:
      return state;
  }
}

export default {
  number
}