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
                alt="Index"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/home.png"
                alt="Home"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/frontend.png"
                alt="Frontend"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/backend.png"
                alt="Backend"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/devops.png"
                alt="DevOps"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/data.png"
                alt="Data"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/full-stack.png"
                alt="Full Stack"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/ux-ui.png"
                alt="UX/UI"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/quality-assurance.png"
                alt="Quality Assurance"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/ios-android.png"
                alt="iOS/Android"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/management.png"
                alt="Management"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/ai-ml.png"
                alt="AI/ML"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/technical-writing.png"
                alt="Technical Writing"
              />
            </div>
            <div className="flex-[0_0_100%] min-w-0 relative">
              <img
                className="mx-auto block"
                height="500px"
                width="500px"
                src="/assets/images/cybersecurity.png"
                alt="Cybersecurity"
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
            Previous
          </button>
          <button
            className="bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 disabled:opacity-50"
            onClick={scrollNext}
            disabled={!nextBtnEnabled}
          >
            Next
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
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
