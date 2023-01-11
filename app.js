const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const dotenv = require("dotenv").config();
const api_key = process.env.API_KEY;

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get('/', (req, res)=>{
   res.render('homepage');
})

app.post('/covid-stats', (req, res)=>{
    const country = req.body.countries;
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/statistics',
        params: {country: `${country}`},
        headers: {
          'X-RapidAPI-Key': api_key,
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };
    axios.request(options).then(function(response){
        res.status(200).render('statistic', {data: response.data.response[0]});
    }).catch(function(error) {
        console.error(error);
        res.send(error);
    })

})

app.get('/country', async (req, res)=>{
    const options = {
        method: 'GET',
        url: 'https://covid-193.p.rapidapi.com/countries',
        headers: {
          'X-RapidAPI-Key': api_key,
          'X-RapidAPI-Host': 'covid-193.p.rapidapi.com'
        }
    };

    axios.request(options).then(await function(response){
        res.status(200).send({
            respond : response.data.response
        });
    }).catch(function(error) {
        console.error(error);
        res.status(500).send(error);
    })
})

app.listen(5500, ()=>{
    console.log("server started on port 5500");
})