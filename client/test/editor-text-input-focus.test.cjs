'use strict';
const { describe, it } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

describe('editor hidden #text input stays focusable (#1945)', () => {
    const html = fs.readFileSync(
        path.join(__dirname, '../src/app/editor/editor.component.html'),
        'utf8'
    );

    it('keeps a single hidden input#text for svg-edit keystrokes', () => {
        const matches = html.match(/<input\b[^>]*\bid="text"[^>]*>/g) || [];
        assert.equal(matches.length, 1, 'exactly one input#text');
    });

    it('places input#text at the top of #svg_editor, outside collapsible panels', () => {
        const svgEditorIdx = html.indexOf('id="svg_editor"');
        assert.ok(svgEditorIdx > 0, '#svg_editor present');
        const textIdx = html.indexOf('<input id="text"');
        assert.ok(textIdx > svgEditorIdx, 'input#text follows #svg_editor open');

        // Must not live inside #text_panel (which sits in Transform mat-expansion-panel)
        const textPanelIdx = html.indexOf('id="text_panel"');
        assert.ok(textPanelIdx > 0, '#text_panel present');
        // Find approximate end of text_panel block: next sibling panel or closing of transform panel
        const afterPanel = html.slice(textPanelIdx, svgEditorIdx);
        assert.ok(
            !/<input\b[^>]*\bid="text"/.test(afterPanel),
            'input#text must not sit under #text_panel before #svg_editor'
        );

        // Last mat-expansion-panel close before #svg_editor must precede input#text
        const beforeSvg = html.slice(0, svgEditorIdx);
        const lastPanelClose = beforeSvg.lastIndexOf('</mat-expansion-panel>');
        assert.ok(lastPanelClose > 0 && textIdx > lastPanelClose,
            'input#text must be after the right-bar expansion panels close');
    });

    it('documents the focusability fix for collapsed Transform (#1945)', () => {
        assert.match(html, /#1945/);
        assert.match(html, /outside collapsible panels so it stays focusable/);
    });
});
