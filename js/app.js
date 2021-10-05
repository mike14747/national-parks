const apiKey = 'ldPNGdkCg4MooP2qY2V5QBBwZb3nfaoFeSCij7uL';

const convertGPS =  (degrees, direction) => Math.abs(parseFloat(degrees)).toFixed(3) + ' ' + (direction === 'latitude' ? degrees >= 0 ? dir = 'N' : dir = 'S' : degrees >= 0 ? dir = 'E' : dir = 'W');

function renderData(data) {
    if (!data) return;
    console.log(data.data);

    let mappedDiv = '';

    data.data.map(park => {
        mappedDiv += `<div class="card">
            <h3>${park.fullName}</h3>
            <p class=description>${park.description}</p>
            <div><img class="image" src="${park.images[0].url}" alt="${park.images[0].altText}" /></div>
            <p><strong>Location:</strong> ${convertGPS(park.latitude, 'latitude')} ${convertGPS(park.longitude, 'longitude')}</p>
            <div><strong>Activities:</strong>
                <ul>
                    ${park.activities.slice(0, 3).map(a => '<li>' + a.name + '</li>').join('')}
                </ul>
            </div>
            <p><a href="${park.url}" target="_blank">More Info</a></p>
        </div>`;
    });

    document.getElementById('root').innerHTML = mappedDiv;
}

// "43.496 N 70.449 W"

async function fetchData() {
    const stateCode = document.getElementById("state").value;
    const url = 'https://developer.nps.gov/api/v1/parks?stateCode=' + stateCode + '&limit=12&api_key=';

    try {
        const response = await fetch(url + apiKey);
        const data = await response.json();
        renderData(data);
    } catch (error) {
        console.log(error)
    }
}

fetchData();