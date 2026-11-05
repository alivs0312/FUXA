'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const viewTs = fs.readFileSync(
    path.join(__dirname, 'fuxa-view.component.ts'),
    'utf8'
);
const viewHtml = fs.readFileSync(
    path.join(__dirname, 'fuxa-view.component.html'),
    'utf8'
);
const dlgHtml = fs.readFileSync(
    path.join(__dirname, 'fuxa-view-dialog/fuxa-view-dialog.component.html'),
    'utf8'
);
const dlgTs = fs.readFileSync(
    path.join(__dirname, 'fuxa-view-dialog/fuxa-view-dialog.component.ts'),
    'utf8'
);

assert.ok(
    /onGotoFromChild\(viewId/.test(dlgTs),
    'dialog closes with goto payload when child Open Page fires'
);
assert.ok(
    /dialogRef\.close\(\{ goto: viewId \}\)/.test(dlgTs),
    'dialog close payload carries goto view id'
);
assert.ok(
    /\(ongoto\)="onGotoFromChild\(\$event\)"/.test(dlgHtml),
    'dialog template wires child ongoto'
);
assert.ok(
    /result\?\.goto/.test(viewTs),
    'openDialog afterClosed promotes goto to host navigation'
);
assert.ok(
    /onCardOpenPage\(viewId/.test(viewTs),
    'cards promote Open Page out of the card'
);
assert.ok(
    /\(ongoto\)="onCardOpenPage\(\$event, card\)"/.test(viewHtml),
    'card nested view wires ongoto'
);
assert.ok(
    /ongoto\?\.observed/.test(viewTs) && /ongoto\.emit\(view\.id\)/.test(viewTs),
    'loadPage still promotes via ongoto when parent listens'
);

console.log('dialog-open-page: ok');
