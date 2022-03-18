// 딜레이 함수
export default function useDelay (duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(true), duration);
  });
}