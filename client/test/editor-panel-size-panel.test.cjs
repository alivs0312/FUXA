'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('editor htmlctrl size prefixes include Panel OXC_ (#1954)', () => {
    it('D prefix list contains OXC_ so Panel shows width/height', () => {
        const src = fs.readFileSync(
            path.join(__dirname, '../src/assets/lib/svgeditor/fuxa-editor.min.js'),
            'utf8'
        );
        const m = src.match(/D=\[[^\]]+\]/);
        assert.ok(m, 'D= array present');
        assert.match(m[0], /"OXC_"/);
        // still keeps prior html control prefixes
        for (const p of ['HXI_', 'HXB_', 'HXS_', 'HXT_', 'HXC_', 'BAG_', 'SLI_', 'GXP_']) {
            assert.match(m[0], new RegExp('"' + p + '"'));
        }
    });
});
