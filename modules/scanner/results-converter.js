const elementToText = (element) => {
    return `<${element.name} ${Object.entries(element.attribs).map(([key, value]) => `${key}="${value}"`).join(' ')}>${element.data ?? ''}</${element.name}>\n`;
}

const resultsToText = (results) => {
    return Object.entries(results).map(([key, value]) => {
        return `${key}: ${value.elements.length} violations\nViolation description: ${value.description}\nRecomendations: ${value.help}\nMore info: ${value.helpUrl}\nElements:\n
        ${value.elements.map(elementToText)}\n
        --------------------------------------------------------------------------\n`
    }).join('\n');
}


const scanToText = ({url, date, violations}) =>
    `Results for ${url}:\nScanned on ${date}\n
    \n${resultsToText(violations)}\n`;


module.exports = {
    toText: scanToText,
}