'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('path');

const css = fs.readFileSync(path.join(__dirname, '../src/styles.css'), 'utf8');

describe('switch toggle size stability (#868)', () => {
    it('md-switch and toggle-button clip overflow so shadow cannot expand layout', () => {
        assert.match(css, /\.md-switch\s*\{[^}]*overflow:\s*hidden/s);
        assert.match(css, /\.toggle-button\s*\{[^}]*overflow:\s*hidden/s);
    });

    it('active thumb uses transform translateX instead of margin-left', () => {
        assert.match(
            css,
            /\.toggle-button\.active\s*>\s*\.inner-circle\s*\{[^}]*transform:\s*translateX\(100%\)/s
        );
        // Should not use margin-left: 50% on the active thumb anymore
        const active = css.match(
            /\.toggle-button\.active\s*>\s*\.inner-circle\s*\{[^}]*\}/s
        );
        assert.ok(active, 'active rule present');
        assert.doesNotMatch(active[0], /margin-left:\s*50%/);
    });

    it('toggle-button no longer transitions margin-left (layout thrash)', () => {
        const btn = css.match(/\.toggle-button\s*\{[^}]*\}/s);
        assert.ok(btn);
        assert.doesNotMatch(btn[0], /margin-left\s+300ms/);
    });
});
