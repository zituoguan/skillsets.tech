export const animateCount = (
  end: number,
  duration: number,
  delay: number,
  setCount: React.Dispatch<React.SetStateAction<number>>
) => {
  setCount(0);

  setTimeout(() => {
    const startTime = performance.now();

    const updateCount = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / duration, 1);

      const easedProgress = 1 - Math.pow(2, -10 * progress);
      const currentCount = Math.round(end * easedProgress);

      setCount(currentCount);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, delay);
};
