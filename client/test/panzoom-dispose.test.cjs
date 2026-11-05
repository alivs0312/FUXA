'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('path');

const homeTs = fs.readFileSync(
    path.join(__dirname, '../src/app/home/home.component.ts'),
    'utf8'
);
const viewTs = fs.readFileSync(
    path.join(__dirname, '../src/app/view/view.component.ts'),
    'utf8'
);

describe('panzoom dispose on view navigation (#482)', () => {
    it('home checkZoom disposes prior panzoom before attaching another', () => {
        assert.match(homeTs, /disposePanZoom\s*\(/);
        assert.match(homeTs, /this\.panZoomController\.dispose\(/);
        assert.match(homeTs, /this\.disposePanZoom\(\);/);
        // checkZoom starts by disposing
        const idx = homeTs.indexOf('private checkZoom()');
        const body = homeTs.slice(idx, idx + 1200);
        assert.match(body, /this\.disposePanZoom\(\)/);
        assert.match(body, /this\.panZoomController\s*=\s*panzoom\(/);
    });

    it('home ngOnDestroy disposes panzoom', () => {
        const idx = homeTs.indexOf('ngOnDestroy()');
        const body = homeTs.slice(idx, idx + 800);
        assert.match(body, /this\.disposePanZoom\(\)/);
    });

    it('view component stores and disposes panzoom controller', () => {
        assert.match(viewTs, /this\.panZoomController\s*=\s*panzoom\(/);
        assert.match(viewTs, /this\.panZoomController\.dispose\(/);
    });
});
