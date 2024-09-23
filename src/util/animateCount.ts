export const animateCount = (
    element: HTMLElement | null,
    endValue: number,
    duration: number,
    text: string
) => {
    let startTime: number | null = null;

    function animate(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const progress = currentTime - startTime;
        const currentValue = Math.min(
            Math.floor((progress / duration) * endValue),
            endValue
        );
        if (element) {
            element.innerHTML = `
    <p class="text-indigo-500 text-7xl font-bold">${currentValue}</p>
    <p class="font-normal text-2xl mt-8">${text}</p>
    `;
        }
        if (currentValue < endValue) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
};