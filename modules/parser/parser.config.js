const HEADINGS = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
const LINKS = ['a'];
const IMAGES = ['img'];
const PARAGRAPHS = ['p'];
const INPUTS = ['input'];
const BUTTONS = ['button'];
const NAVS = ['nav'];
const FOOTERS = ['footer'];
const HTML = ['html'];

const allowedTags = [...HEADINGS, ...LINKS, ...IMAGES, ...PARAGRAPHS, ...INPUTS, ...BUTTONS, ...NAVS, ...FOOTERS, ...HTML];


module.exports = {
    allowedTags,
}