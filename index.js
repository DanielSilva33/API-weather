const express = require("express");
const https = require("https");


const app = express();

const apiKey = 'CHAVE DE API AQUI';
const units = 'units=metric'
const lang = 'lang=pt_br'
let cidade = 'são paulo'

const city = cidade.replace(' ', '+');

let baseURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&${units}&${lang}`

app.get('/', (req, res) => {
    https.get(baseURL, function (response) {

        response.on('data', function (data) {
            const tempp = JSON.parse(data);
            const temperatura = tempp.main.temp;
            const termic = tempp.main.feels_like;
            const tempMin = tempp.main.temp_min;
            const tempMax = tempp.main.temp_max;
            const umidade = tempp.main.humidity;
            const nomeCidade = tempp.name;
            const weatherTemp = tempp.weather;
            const weather = weatherTemp.map((item) => item.description);

            return res.json({
                "Cidade": `${nomeCidade} - ${weather}`,
                'Temperatura': `${temperatura.toFixed(0)}°C`,
                'Sensação termica': `${termic.toFixed(0)}°C`,
                'Temperatura minima': `${tempMin.toFixed(0)}°C`,
                'Temperatura maxima': `${tempMax.toFixed(0)}°C`,
                'Umidade do ar': `${umidade}%`,

            })
        })
    })

});


app.use(express.json());
app.listen('3333');