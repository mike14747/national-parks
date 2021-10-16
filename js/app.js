document.getElementById("state").innerHTML = stateList.map(state => `<option data-name="${state.name}" value="${state.value}" ${state.value === 'ca' && 'selected=selected'}>${state.name}</option>`).join('');

const apiKey = 'ldPNGdkCg4MooP2qY2V5QBBwZb3nfaoFeSCij7uL';

const convertGPS = (deg, dir) => {
    if (!deg || isNaN(deg)) {
        return 'n/a';
    }
    return Math.abs(parseFloat(deg)).toFixed(3) + ' ' + (dir === 'latitude' ? deg >= 0 ? 'N' : 'S' : deg >= 0 ? 'E' : 'W');
}

function renderData(data, stateName) {
    if (!data) {
        document.getElementById('root').innerHTML = '<h3 class="error">An error occurred fetching data!</h3>';
        document.getElementById('viewing').textContent = stateName || 'n/a';
        return;
    }

    let mappedDiv = '';

    data.map(park => {
        mappedDiv += `<div class="card">
            <h3>${park.fullName || 'Name: n/a'}</h3>
            <p class=description>${park.description || '---no description available---'}</p>
            <div class="img-container">
                ${park.images[0]?.url ? `<img class="image" src="${park.images[0].url}" alt="${park.images[0].altText}" />` : '<p>---no image is available---</p>'}
            </div>
            <p class="location"><strong>Location:</strong> ${convertGPS(park.latitude, 'latitude')} ${convertGPS(park.longitude, 'longitude')}</p>
            <p class="activities">
                ${park.activities?.length > 0 ? `<span class="activities-text">Activities:</span> ${park.activities.map(a => a.name).join(', ') || 'n/a'}` : '---no activities are available---'}
            </p>
            <p class="info">
                ${park.url ? `<a href="${park.url}" target="_blank"><span class="pointer">More Info</span></a>` : ''}
            </p>
        </div>`;
    });

    document.getElementById('root').innerHTML = mappedDiv;
    document.getElementById('viewing').textContent = stateName || '';
}

async function fetchData() {
    const stateCode = document.getElementById("state").value;
    const stateName = document.querySelector(`[value=${stateCode}]`).getAttribute('data-name');
    const url = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=100&api_key=';

    const data = await fetch(url + apiKey)
        .then(res => res.json())
        .catch(error => console.error(error));
    if (data) renderData(data?.data, stateName || null);
}

fetchData();