import { getData, processTechnologies, countUniqueTechnologies, createChart, animateCount } from './functions.js';

async function init() {
    const data = await getData('/data/frontend.json');

    const jobAdsCount = data.length;
    const jobAdsCountElement = document.getElementById('jobAdsCount');
    animateCount(jobAdsCountElement, jobAdsCount, 1000, 'job ads analyzed');

    const uniqueTechCount = countUniqueTechnologies(data);
    const techCountElement = document.getElementById('techCount');
    animateCount(techCountElement, uniqueTechCount, 1000, 'technologies found');

    const techData = processTechnologies(data);
    createChart(techData);
}

init();
