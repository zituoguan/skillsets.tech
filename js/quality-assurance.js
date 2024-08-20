import { countUniqueTechnologies, animateCount } from "./functions.js";

async function getData() {
    const response = await fetch('/data/quality-assurance.json');
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
        .slice(0, 20)
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
}

function createChart(techData) {
    var options = {
        chart: {
            type: 'bar',
            height: 1000,
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
                    fontSize: '16px',
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
