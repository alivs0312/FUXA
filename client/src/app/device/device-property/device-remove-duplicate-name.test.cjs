'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(
    path.join(__dirname, 'device-property.component.ts'),
    'utf8'
);

assert.ok(
    /isToRemove \|\| this\.data\?\.remove/.test(src),
    'isValid allows remove even when another device shares the name'
);

// Simulate the dialog gate logic
function isValid(device, exist, isToRemove) {
    if (isToRemove) return true;
    if (!device.name || !device.type) return false;
    return exist.find((n) => n === device.name) ? false : true;
}

const exist = ['Get_From_Sentinel', 'mqtt', 'server'];
const doomed = { name: 'Get_From_Sentinel', type: 'WebAPI', id: 'd_05654ba8' };
assert.strictEqual(
    isValid(doomed, exist, true),
    true,
    'remove OK enabled with duplicate name'
);
assert.strictEqual(
    isValid(doomed, exist, false),
    false,
    'edit still blocked when renaming to an existing name'
);
assert.strictEqual(
    isValid({ name: 'Unique', type: 'WebAPI' }, exist, false),
    true,
    'unique name still valid'
);

console.log('device-remove-duplicate-name: ok');
