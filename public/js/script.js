const form = document.getElementsByTagName('form');
const selectBox = document.querySelector('#select-box');

const handleRequest = async () => {
    const response = await fetch('http://localhost:5500/country');
    const data = await response.json();
    shownCountry(data.respond);    
}

const shownCountry = (countries) => {
    for(let i=1; i<countries.length; i++){
        selectBox.innerHTML+=`<option value = ${countries[i]}>${countries[i]}</option>`;
    }
}

handleRequest();
