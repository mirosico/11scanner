const violationsMap = {
    'no-alt': {
        description: 'Image elements must have an alt attribute',
        help: 'Provide an alt attribute for image elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/image-alt',
    },
    'no-lang': {
        description: 'HTML element must have a lang attribute',
        help: 'Provide a lang attribute for the HTML element',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/html-has-lang',
    },
    'li-not-in-list': {
        description: 'List items must be contained within <ul> or <ol> elements',
        help: 'Place list items within <ul> or <ol> elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/listitem',
    },
    'list-contains-not-only-li': {
        description: 'Lists must contain only <li> elements directly within them',
        help: 'Remove any elements that are not <li> elements from lists',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/list-contains-only-li',
    },
    'no-track-for-video': {
        description: 'Video elements must have an audio description track',
        help: 'Provide an audio description track for video elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/video-description',
    },
    'area-alt': {
        description: 'Area elements must have an alt attribute',
        help: 'Provide an alt attribute for area elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/area-alt',
    },
    'anchor-is-valid': {
        description: 'Anchor elements must have a valid href attribute',
        help: 'Provide a valid href attribute for anchor elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/anchor-is-valid',
    },
    'unique-id': {
        description: 'Elements must have unique IDs',
        help: 'Provide a unique ID for each element',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/duplicate-id',
    },
    'aria-input-field-name': {
        description: 'Elements with ARIA roles must have accessible names',
        help: 'Provide an accessible name for each element with an ARIA role. If the element is a form input, use a label element. Otherwise, use aria-label or aria-labelledby',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/aria-input-field-name',
    },
    'frame-focusable-content': {
        description: '<frame> and <iframe> elements with focusable content should not have tabindex=-1',
        help: 'Remove tabindex=-1 from <frame> and <iframe> elements with focusable content',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/frame-focusable-content',
    },
    'input-label': {
        description: 'Input elements must have a label',
        help: 'Provide a label for each input element',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/label',
    },
    'input-image-alt': {
        description: 'Image input elements must have an alt attribute',
        help: 'Provide an alt attribute for image input elements',
        helpUrl: 'https://dequeuniversity.com/rules/axe/3.5/input-image-alt',
    },
}

module.exports = {
    violationsMap,
}