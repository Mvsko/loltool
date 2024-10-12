const axios = require('axios');
const cheerio = require('cheerio');

const getPatchTimelapse = async (link) => {
    try {
        const response = await axios.get(link);
        const $ = cheerio.load(response.data);
        
        const patchDate = $('time[datetime]').attr('datetime');
        
        if (!patchDate) {
            return { error: 'Date not found in patch notes' };
        }

        const patchDateObj = new Date(patchDate);
        const currentDate = new Date();
        const timeDiff = currentDate - patchDateObj;
        
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        //const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        
        //const timeElapsed = `${days}j ${hours}h`;
        const timeElapsed = `${days}j`;
        
        return timeElapsed;
    } catch (error) {
        console.error('Error fetching patch timelapse:', error);
        return { error: 'Failed to fetch patch timelapse' };
    }
};

module.exports = getPatchTimelapse;
