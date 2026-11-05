const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const test = require('node:test');
const ts = require('typescript');

function load(calls) {
    const filename = path.join(__dirname, '../src/app/gauges/controls/html-switch/html-switch.component.ts');
    const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
        compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022, experimentalDecorators: true }
    });
    class GaugeBaseComponent {
        static runActionHide(el, type) { calls.push('hide:' + type); }
        static runActionShow(el, type) { calls.push('show:' + type); }
        static checkBitmaskAndValue(b, v) { return v; }
    }
    const imports = {
        '@angular/core': { Injectable: () => () => {} },
        '../../../_models/hmi': { GaugeActionsType: { hide: 'shapes.action-hide', show: 'shapes.action-show' } },
        '../../gauge-base/gauge-base.component': { GaugeBaseComponent }
    };
    const exports = {};
    vm.runInNewContext(outputText, { exports, console, SVG: { adopt: n => n }, require: name => imports[name] || {} });
    return exports.HtmlSwitchComponent;
}

test('switch exposes hide/show actions and runs them for action tags (#2084)', () => {
    const calls = [], values = [];
    const Switch = load(calls);
    assert.equal(Object.keys(Switch.getActions()).join(), 'hide,show');
    const ga = { property: { variableId: 'v1', options: {}, actions: [
        { variableId: 'a1', type: 'hide', range: { min: 1, max: 1 } },
        { variableId: 'a1', type: 'show', range: { min: 0, max: 0 } }] } };
    const switcher = { setValue: v => values.push(v) };
    Switch.processValue(ga, { node: {} }, { id: 'a1', value: '1' }, {}, switcher);
    assert.deepEqual(calls, ['hide:hide']);
    assert.deepEqual(values, [], 'action tag must not change switch state');
    Switch.processValue(ga, { node: {} }, { id: 'v1', value: '1' }, {}, switcher);
    assert.deepEqual(values, [1]);
    assert.equal(Switch.getSignals(ga.property).join(), 'v1,a1,a1');
});
