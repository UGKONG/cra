// fade 함수
export default function useFade (id, state, duration = 500) {
  if (!id) return;
  const el = document.querySelector(id);
  el.style.transition = `${duration / 1000}s`;
  el.style.opacity = 0;
  if (state) {
    el.style.display = 'block';
    setTimeout(() => el.style.opacity = 1, 0);
  } else {
    setTimeout(() => el.style.display = 'none', duration);
  }
  return true;
}