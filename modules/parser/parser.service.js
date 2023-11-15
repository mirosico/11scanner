const axios = require('axios');
const cheerio = require('cheerio');
const {allowedTags} = require('./parser.config');
const parseWebsite = async (url) => {
    try {
        const { data } = await axios.get(url);
        const $ = cheerio.load(data);
        const elements = [];

        allowedTags.forEach(tag => {
            $(tag).each((index, element) => {
                elements.push(element);
            });
        });

        return elements;
    } catch (error) {
        console.error(`Error fetching content from ${url}: `, error);
        return null;
    }
};

module.exports = {
    parseWebsite,
}
