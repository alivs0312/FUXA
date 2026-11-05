'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('path');

const viewTs = fs.readFileSync(
    path.join(__dirname, '../src/app/fuxa-view/fuxa-view.component.ts'),
    'utf8'
);
const cardsHtml = fs.readFileSync(
    path.join(__dirname, '../src/app/cards-view/cards-view.component.html'),
    'utf8'
);

describe('multiview Open View promotes to home (#1696)', () => {
    it('cards-view wires fuxa-view ongoto to onGoToPage', () => {
        assert.match(
            cardsHtml,
            /<app-fuxa-view[^>]*\(ongoto\)="onGoToPage\(\$event\)"/
        );
    });

    it('loadPage emits ongoto when a parent is listening and no local options', () => {
        assert.match(viewTs, /this\.ongoto\?\.observed/);
        assert.match(viewTs, /this\.ongoto\.emit\(view\.id\)/);
        assert.match(viewTs, /needsLocalOptions/);
    });

    it('loadPage still supports local loadHmi when mapping/scale options are set', () => {
        assert.match(viewTs, /options\?\.variablesMapping/);
        assert.match(viewTs, /this\.loadHmi\(view,\s*true\)/);
    });
});
