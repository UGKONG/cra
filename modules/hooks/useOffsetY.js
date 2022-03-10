export default function useOffsetY(ref) {
  let result = null;
  if (!ref?.current) return result;
  result = ref.current.getBoundingClientRect().top;
  return result;
}