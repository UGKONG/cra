import _ from "lodash";
// 배열 순서 랜덤 함수
export default function useRandomArray (array = []) {
  if (array.length === 0 || !Array.isArray(array)) return [];
  return _.shuffle(array);
}