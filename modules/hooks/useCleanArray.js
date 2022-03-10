import _ from "lodash";

// 배열 중복값 필터 함수
export default function useCleanArray (allArr = [], fieldName, returnKey = []) {
  if (allArr.length === 0) return console.warn('배열 allArr가 비어있습니다.');
  if (!fieldName) return console.warn('Key값이 없습니다.');
  if (!Array.isArray(returnKey)) return console.warn('Return Key값이 배열이 아닙니다.');
  let result = _.uniqBy(allArr, fieldName);
  let returnValue = [...result];
  
  if (returnKey.length > 0) {
    returnValue = result.map(item => {
      let data = {};
      returnKey.forEach(key => data[key] = item[key]);
      return data;
    })
  }
  return returnValue;
}