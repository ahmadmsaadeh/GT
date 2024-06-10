const axios = require('axios');

const API_KEY = '3736d102fd6543bfa45144727231307';
const WEATHER_API_URL = 'http://api.weatherapi.com/v1/current.json';

exports.getWeather = async (req, res) => {
    console.log('Weather');
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
        return res.status(400).json({ error: "Latitude and longitude are required" });
    }
    
    try {
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                key: API_KEY,
                q: `${lat},${lon}`,
                aqi: 'no'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to retrieve weather data" });
    }
};
