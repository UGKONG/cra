// 배열 순서 변경 함수
export default function useArrayMove (_array, _old, _new) {
  if (!Array.isArray(_array)) return console.warn('_array is not Array!!');
  if (_array.length === 0) return _array;
  let result = [];
  let temp = _array[_old];
  _array.forEach((item, i) => i !== _old && result.push(item));
  result.splice(_new, 0, temp);
  return result;
}