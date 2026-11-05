'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const ts = fs.readFileSync(
    path.join(__dirname, 'chart-uplot.component.ts'),
    'utf8'
);
const scss = fs.readFileSync(
    path.join(__dirname, 'chart-uplot.component.scss'),
    'utf8'
);
const start = ts.indexOf('private updateDomOptions');
assert.ok(start > 0);
const slice = ts.slice(start, start + 2500);

assert.ok(/legend\.style\.backgroundColor/.test(slice), 'legend gets backgroundColor');
assert.ok(/uplotRoot\.style\.backgroundColor/.test(slice), 'uplot root gets backgroundColor');
assert.ok(/legendBackground/.test(slice), 'syncs legendBackground from colorBackground');
assert.ok(/\.u-legend/.test(scss) && /background-color: inherit/.test(scss),
    'scss inherits background onto legend');

console.log('chart-background: ok');
