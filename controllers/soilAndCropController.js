const axios = require('axios');
const Garden = require('../models/Garden');
const Crop = require('../models/Crop');

const getCropData = async (cropName) => {
    const url = `https://openfarm.cc/api/v1/crops/?filter=${cropName}`;
    try {
        const response = await axios.get(url);
        return response.data.data;
    } catch (error) {
        console.error('Error fetching crop data:', error.response ? error.response.data : error.message);
    }
};

const getSoilData = async (latitude, longitude) => {
    const url = `https://rest.isric.org/soilgrids/v2.0/classification/query?lon=${longitude}&lat=${latitude}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching soil data:', error.response ? error.response.data : error.message);
    }
};

const getGardenSoilAndCropData = async (gardenId) => {
    const garden = await Garden.findByPk(gardenId);
    const { location, name } = garden;
    const [latitude, longitude] = location.split(',').map(coord => parseFloat(coord.trim()));

    const soilData = await getSoilData(latitude, longitude);
    const crops = await Crop.findAll({ where: { garden_id: gardenId } });

    const cropDataPromises = crops.map(crop => getCropData(crop.name));
    const cropData = await Promise.all(cropDataPromises);

    return {
        gardenName: name,
        soilData,
        cropData
    };
};

exports.getGardenSoilData = async (req, res) => {
    const { gardenId } = req.body;
    try {
        const data = await getGardenSoilAndCropData(gardenId);
        res.status(200).json({
            status: 'success',
            data: data
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching data', error: error.message });
    }
};
