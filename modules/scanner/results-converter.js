const elementToText = (element) => {
    return `Element: ${element.name}\n
    Attributes: ${JSON.stringify(element.attribs)}\n
    Children: ${JSON.stringify(element.children)}\n
    Data: ${JSON.stringify(element.data)}\n
    `;
}

const resultsToText = (results) => {
    return Object.entries(results).map(([key, value]) => {
        return `${value.title}: ${value.elements.length} violations\n
        ${value.elements.map(elementToText)}\n
        Recomendations: ${value.help}\n
        More info: ${value.helpUrl}\n`
    }).join('\n');
}


const scanToText = (url, results) =>
    `Scan for ${url}:\n${resultsToText(results)}\n`;


module.exports = {
    toText: scanToText,
}