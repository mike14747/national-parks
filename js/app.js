document.getElementById("state").innerHTML = stateList.map(state => `<option data-name="${state.name}" value="${state.value}" ${state.value === 'ca' && 'selected=selected'}>${state.name}</option>`).join('');

const apiKey = 'ldPNGdkCg4MooP2qY2V5QBBwZb3nfaoFeSCij7uL';

const convertGPS = (deg, dir) => Math.abs(parseFloat(deg)).toFixed(3) + ' ' + (dir === 'latitude' ? deg >= 0 ? 'N' : 'S' : deg >= 0 ? 'E' : 'W');

function renderData(data, stateName) {
    if (!data) return;
    console.log(data);

    let mappedDiv = '';

    data.map(park => {
        mappedDiv += `<div class="card">
            <h3>${park.fullName}</h3>
            <p class=description>${park.description}</p>
            <div class="img-container"><img class="image" src="${park.images[0].url}" alt="${park.images[0].altText}" /></div>
            <p class="location"><strong>Location:</strong> ${convertGPS(park.latitude, 'latitude')} ${convertGPS(park.longitude, 'longitude')}</p>
            <div class="activities"><span class="activities-text">Activities:</span>
                <ul>
                    ${park.activities.slice(0, 3).map(a => '<li>' + a.name + '</li>').join('')}
                </ul>
            </div>
            <p class="info"><a href="${park.url}" target="_blank"><span class="pointer">More Info</span></a></p>
        </div>`;
    });

    document.getElementById('root').innerHTML = mappedDiv;
    document.getElementById('viewing').textContent = stateName;
}

async function fetchData() {
    const stateCode = document.getElementById("state").value;
    const stateName = document.querySelector(`[value=${stateCode}]`).getAttribute('data-name');
    const url = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=12&api_key=';

    try {
        const response = await fetch(url + apiKey);
        const data = await response.json();
        renderData(data?.data, stateName);
    } catch (error) {
        console.log(error)
    }
}

fetchData();