async function getData() {
    const response = await fetch('/data/all.json');
    const data = await response.json();
    return data;
}

function processTechnologies(data) {
    const techCount = {};
    data.forEach(item => {
        item.technologies.forEach(tech => {
            techCount[tech] = (techCount[tech] || 0) + 1;
        });
    });
    return Object.entries(techCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 40)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
}

function countUniqueTechnologies(data) {
    const uniqueTechnologies = new Set();
    data.forEach(item => {
        item.technologies.forEach(tech => {
            uniqueTechnologies.add(tech);
        });
    });
    return uniqueTechnologies.size;
}

function createChart(techData) {
    var options = {
        chart: {
            type: 'bar',
            height: 2000,
            toolbar: {
                show: true
            }
        },
        series: [{
            name: 'Mentions in Job Ads',
            data: Object.values(techData)
        }],
        xaxis: {
            categories: Object.keys(techData),
            labels: {
                style: {
                    fontSize: '14px',
                    fontFamily: 'JetBrains Mono',
                }
            }
        },
        yaxis: {
            labels: {
                style: {
                    fontSize: '18px',
                    fontFamily: 'JetBrains Mono',
                }
            }
        },
        plotOptions: {
            bar: {
                horizontal: true,
                borderRadius: 10,
                barHeight: '80%',
                colors: {
                    backgroundBarColors: [],
                    backgroundBarOpacity: 1,
                }
            }
        },
        fill: {
            colors: ['#6875F5']
        },
        tooltip: {
            theme: 'light',
            style: {
                fontSize: '14px',
                fontFamily: 'JetBrains Mono',
            }
        }
    };

    var chart = new ApexCharts(document.querySelector("#techChart"), options);
    chart.render();
}

function animateCount(element, endValue, duration, text) {
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

async function init() {
    const data = await getData();

    const jobAdsCount = data.length;

    const jobAdsCountElement = document.getElementById('jobAdsCount');
    animateCount(jobAdsCountElement, jobAdsCount, 1000, 'job ads analyzed');

    const uniqueTechCount = countUniqueTechnologies(data);
    const techCountElement = document.getElementById('techCount');
    animateCount(techCountElement, uniqueTechCount, 1000, 'skills found');

    const techData = processTechnologies(data);
    createChart(techData);
}

init();
