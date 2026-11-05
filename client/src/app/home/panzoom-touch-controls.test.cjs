'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(
    path.join(__dirname, 'home.component.ts'),
    'utf8'
);

assert.ok(
    /private isPanZoomInteractiveTarget\(target/.test(src),
    'helper that detects interactive panzoom targets'
);
assert.ok(
    /beforeMouseDown:\s*\(e\)\s*=>\s*this\.isPanZoomInteractiveTarget/.test(src),
    'beforeMouseDown skips pan on controls'
);
assert.ok(
    /onTouch:\s*\(e\)\s*=>\s*!this\.isPanZoomInteractiveTarget/.test(src),
    'onTouch lets control touch handlers run'
);
assert.ok(/foreignObject/.test(src), 'covers foreignObject-hosted controls');
assert.ok(/button, a, input/.test(src), 'covers button/input selectors');

console.log('panzoom-touch-controls: ok');
