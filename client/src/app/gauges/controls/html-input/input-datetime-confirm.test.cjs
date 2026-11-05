'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(
    path.join(__dirname, 'html-input.component.ts'),
    'utf8'
);

assert.ok(
    /event\.key === 'Enter' \|\| event\.code === 'Enter'/.test(src),
    'numeric range check accepts key or code Enter'
);
assert.ok(
    /code: 'Enter'/.test(src) && /keyCode: 13/.test(src) && /bubbles: true/.test(src),
    'confirm button dispatches a complete Enter KeyboardEvent'
);
assert.ok(
    /preventDefault/.test(src) && /Keep input focused/.test(src),
    'mousedown/touchstart preventDefault keeps focus for confirm'
);

console.log('input-datetime-confirm: ok');
