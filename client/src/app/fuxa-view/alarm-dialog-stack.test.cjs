'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(
    path.join(__dirname, 'fuxa-view.component.ts'),
    'utf8'
);
const start = src.indexOf('async openDialog(event, viewref');
assert.ok(start > 0, 'openDialog method present');
const slice = src.slice(start, start + 1200);

assert.ok(
    /openDialogs\.filter/.test(slice),
    'counts already-open FuxaViewDialog instances before opening another'
);
assert.ok(
    /instanceof FuxaViewDialogComponent/.test(slice),
    'filters to FuxaViewDialogComponent only'
);
assert.ok(
    /stacked \* 28/.test(slice),
    'offsets subsequent dialogs so the latest is not fully covered'
);
assert.ok(
    /position\.left/.test(slice),
    'applies a left offset when stacking'
);
assert.ok(
    /60 \+ offset/.test(slice),
    'keeps the first dialog near top:60px and shifts later ones down'
);

console.log('alarm-dialog-stack: ok');
