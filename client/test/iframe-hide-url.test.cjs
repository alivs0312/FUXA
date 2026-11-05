'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const viewHtml = fs.readFileSync(
    path.join(__dirname, '../src/app/fuxa-view/fuxa-view.component.html'),
    'utf8'
);
const viewTs = fs.readFileSync(
    path.join(__dirname, '../src/app/fuxa-view/fuxa-view.component.ts'),
    'utf8'
);
const flexHtml = fs.readFileSync(
    path.join(__dirname, '../src/app/gauges/gauge-property/flex-event/flex-event.component.html'),
    'utf8'
);
const enJson = fs.readFileSync(
    path.join(__dirname, '../src/assets/i18n/en.json'),
    'utf8'
);

describe('iframe hide URL option (#1919)', () => {
    it('openIframe copies actoptions.hideUrl onto the card model', () => {
        assert.match(viewTs, /iframe\.hideUrl\s*=\s*!!options\?\.hideUrl/);
        assert.match(viewTs, /hideUrl:\s*boolean/);
    });

    it('iframe header hides the URL span when hideUrl is set', () => {
        assert.match(
            viewHtml,
            /<span\s+\*ngIf="!iframe\.hideUrl">\{\{iframe\.name\}\}<\/span>/
        );
    });

    it('flex-event exposes a Hide URL toggle for iframe (withScale) actions', () => {
        assert.match(flexHtml, /item\.actoptions\.hideUrl/);
        assert.match(flexHtml, /gauges\.property-event-hideUrl/);
        assert.match(flexHtml, /\*ngIf="withScale\(item\.action\)"/);
    });

    it('en locale defines gauges.property-event-hideUrl', () => {
        assert.match(enJson, /"gauges\.property-event-hideUrl"\s*:\s*"Hide URL"/);
    });
});
