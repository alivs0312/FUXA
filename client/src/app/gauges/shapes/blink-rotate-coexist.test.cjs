'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const shapes = fs.readFileSync(
    path.join(__dirname, 'shapes.component.ts'),
    'utf8'
);
const base = fs.readFileSync(
    path.join(__dirname, '../gauge-base/gauge-base.component.ts'),
    'utf8'
);

assert.ok(
    /spool\?\.rotateType|rotateType === type/.test(shapes),
    'rotate early-return uses rotateType so blink type does not restart spin'
);
assert.ok(
    /startRotateAnimationShape\(element, type, 360, existing\)/.test(shapes),
    'preserves existing blink timer when starting rotate'
);
assert.ok(
    /timer: existing\?\.timer/.test(shapes),
    'merges blink timer into rotate actionRef'
);
assert.ok(
    /!gaugeStatus\.actionRef\.animr/.test(base),
    'blink does not overwrite type while rotate animr is active'
);
assert.ok(
    /blinkType/.test(base),
    'records blink alongside rotate in spool'
);

console.log('blink-rotate-coexist: ok');
