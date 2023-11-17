const {violationsMap} = require("./scanner.config");
const getViolationScanStrategy = (violationKey) => {
    const violationScanStrategies = {
        'no-alt': scanForImageAlt,
        'no-lang': scanForHTMLLang,
        'li-not-in-list': scanForLiNotInList,
        'list-contains-not-only-li': scanForListContainsNotOnlyLi,
        'no-track-for-video': scanForVideoDescription,
        'area-alt': scanForAreaAlt,
        'anchor-is-valid': scanForAnchorHref,
        'unique-id': scanForUniqueIds,
        'aria-input-field-name': scanForAriaInputFieldName,
        'frame-focusable-content': scanForFrameFocusableContent,
        'input-label': scanForInputLabel,
        'input-image-alt': scanForInputImageAlt,
    }
    return violationScanStrategies[violationKey];
}
const scanForListContainsNotOnlyLi = ({name, children}) =>
    (name === 'ul' || name === 'ol') && children && children.some(child => child.name !== 'li')
const scanForLiNotInList = ({name, parent}) =>
    name === 'li' && parent.name !== 'ul' && parent.name !== 'ol';
const scanForImageAlt = ({name, attribs}) => name === 'img' && !attribs.alt;
const scanForHTMLLang = ({name, attribs}) =>
    name === 'html' && !attribs.lang;

const scanForVideoDescription = ({name, children}) =>
    name === 'video' && children && children.some(child => child.name === 'track' && child.attribs.kind === 'descriptions');

const scanForAreaAlt = ({name, attribs}) =>
    name === 'area' && !attribs.alt;

const scanForAnchorHref = ({name, attribs}) =>
    name === 'a' && !attribs.href;

const scanForUniqueIds = ({attribs}, elements) => {
    if (!attribs) return false;
    const {id} = attribs;
    return id && elements.filter(e => e.attribs.id === id).length > 1;
}

const scanForAriaInputFieldName = ({attribs}) => {
    if (!attribs) return false;
    const {role, 'aria-label': ariaLabel, 'aria-labelledby': ariaLabelledBy} = attribs;
    const hasAriaRole = !!role;
    const hasAriaLabel = !!ariaLabel;
    const hasAriaLabelledBy = !!ariaLabelledBy;
    return hasAriaRole && !hasAriaLabel && !hasAriaLabelledBy;
}

const scanForFrameFocusableContent = ({name, children}) => {
    if (name !== 'frame' && name !== 'iframe') return false;
    if (!children) return false;
    return children.some(child => child.attribs.tabindex === '-1');
}

const scanForInputLabel = ({name, attribs, parent}, elements) => {
    if (name !== 'input') return false;
    if (!attribs) return false;
    const {id, 'aria-labelledby': labelledby} = attribs;
    if (!id && !labelledby) return parent.name !== 'label';
    const label = elements.find(e => e.name === 'label' && e.attribs.for === id) || elements.find(e => e.name === 'label' && e.attribs.id === labelledby);
    return !label;
}

const scanForInputImageAlt = ({name, attribs}) => {
    if (name !== 'input') return false;
    if (!attribs) return false;
    const {type} = attribs;
    if (type !== 'image') return false;
    return !attribs.alt;
}

const scan = (elements, ignoreViolations) => {
    const resultsMap = {};
    elements.forEach((element, i, allElements) => {
        Object.entries(violationsMap).map(([violationKey, violation]) => {
            if (!ignoreViolations.includes(violationKey) && getViolationScanStrategy(violationKey)(element, allElements)) {
                if (!resultsMap[violationKey]) {
                    resultsMap[violationKey] = {
                        ...violation,
                        elements: [],
                    }
                }
                resultsMap[violationKey].elements.push({
                    name: element.name,
                    attribs: element.attribs,
                    data: element.data,
                });
            }
        })
    })
    return resultsMap;
}


module.exports = {
    scan,
}