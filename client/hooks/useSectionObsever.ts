import { useCallback, useEffect, useRef } from "react";

/**관측대상 아이템을 부여하고 감시하는 훅 */
const useSectionObsever = (callback: () => void, options: number) => {
  const targetItemRef = useRef<HTMLDivElement|null>(null);
  const memoCallback = useCallback(callback, []);
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          memoCallback();
        }
      },
      { threshold: options },
    );

    const currentRef = targetItemRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.disconnect();
      }
    };
  }, [callback, options]);

  return { targetItemRef };
};
export default useSectionObsever;
