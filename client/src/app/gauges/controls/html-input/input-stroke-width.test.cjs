'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(
    path.join(__dirname, 'html-input.component.ts'),
    'utf8'
);
const html = fs.readFileSync(
    path.join(__dirname, 'input-property/input-property.component.html'),
    'utf8'
);
const en = fs.readFileSync(
    path.join(__dirname, '../../../../assets/i18n/en.json'),
    'utf8'
);

assert.ok(/options\?\.strokeWidth/.test(ts), 'reads options.strokeWidth');
assert.ok(/stroke-width/.test(ts) && /sw === 0/.test(ts),
    'allows stroke-width 0 / none');
assert.ok(/property\.options\.strokeWidth/.test(html),
    'property dialog exposes strokeWidth');
assert.ok(/gauges\.property-input-stroke-width/.test(html),
    'uses i18n key for label');
assert.ok(/"gauges\.property-input-stroke-width": "Stroke width"/.test(en),
    'en translation present');

console.log('input-stroke-width: ok');
