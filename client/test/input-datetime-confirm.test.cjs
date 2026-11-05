'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const src = fs.readFileSync(
    path.join(__dirname, '../src/app/gauges/controls/html-input/html-input.component.ts'),
    'utf8'
);

test('datetime confirm button (#1063)', () => {
    assert.match(src, /event\.key === 'Enter' \|\| event\.code === 'Enter'/);
    assert.ok(
        /code: 'Enter'/.test(src) && /keyCode: 13/.test(src) && /bubbles: true/.test(src),
        'confirm button dispatches a complete Enter KeyboardEvent'
    );
    assert.ok(
        /preventDefault/.test(src) && /Keep input focused/.test(src),
        'mousedown/touchstart preventDefault keeps focus for confirm'
    );
    assert.match(
        src,
        /function startButtonPress\(ev\?: MouseEvent \| TouchEvent\)/,
        'press handler uses DOM MouseEvent|TouchEvent (not hmi Event)'
    );
});
