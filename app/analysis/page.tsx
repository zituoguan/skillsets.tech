"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

export default function Analysis() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    setScrollSnaps(emblaApi.scrollSnapList());
    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="mt-40 mb-40">
      <div className="relative mx-auto max-w-4xl">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/index.png"
                alt="首页"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/home.png"
                alt="主页"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/frontend.png"
                alt="前端"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/backend.png"
                alt="后端"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/devops.png"
                alt="运维"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/data.png"
                alt="数据"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/full-stack.png"
                alt="全栈"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/ux-ui.png"
                alt="用户体验/界面设计"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/quality-assurance.png"
                alt="质量保证"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/ios-android.png"
                alt="iOS/安卓"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/management.png"
                alt="管理"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/ai-ml.png"
                alt="人工智能/机器学习"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/technical-writing.png"
                alt="技术写作"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/cybersecurity.png"
                alt="网络安全"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center mt-4 gap-4">
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 disabled:opacity-50"
            onClick={scrollPrev}
            disabled={!prevBtnEnabled}
          >
            上一张
          </button>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 disabled:opacity-50"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            下一张
          </button>
        </div>

        <div className="flex justify-center mt-4 gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full ${
                index === selectedIndex ? "bg-indigo-500" : "bg-gray-300"
              }`}
              onClick={() => scrollTo(index)}
              aria-label={`跳转到第 ${index + 1} 张幻灯片`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
