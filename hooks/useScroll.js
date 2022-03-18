import { useState, useEffect } from "react";

export default function useScroll() {
  const [state, setState] = useState(0);
  const onScroll = () => setState(window.scrollY);
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  
  return state;
}