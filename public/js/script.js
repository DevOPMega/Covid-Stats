const form = document.getElementsByTagName('form');
const selectBox = document.querySelector('#select-box');

const handleRequest = async () => {
    const response = await fetch('https://covid-stats-8a9a.onrender.com/country');
    const data = await response.json();
    shownCountry(data.respond);    
}

const shownCountry = (countries) => {
    for(let i=1; i<countries.length; i++){
        selectBox.innerHTML+=`<option value = ${countries[i]}>${countries[i]}</option>`;
    }
}

handleRequest();
