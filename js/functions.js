export function countUniqueTechnologies(data) {
    const uniqueTechnologies = new Set();
    data.forEach(item => {
        item.technologies.forEach(tech => {
            uniqueTechnologies.add(tech);
        });
    });
    return uniqueTechnologies.size;
}

export function animateCount(element, endValue, duration, text) {
    let startTime = null;

    function animate(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = currentTime - startTime;
        const currentValue = Math.min(Math.floor(progress / duration * endValue), endValue);
        element.innerHTML = `
        <p class="text-indigo-500 text-7xl font-bold">${currentValue}</p>
        <p class="font-normal text-2xl mt-8">${text}</p>
        `;
        if (currentValue < endValue) {
            requestAnimationFrame(animate);
        }
    }

    requestAnimationFrame(animate);
}