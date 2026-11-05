'use strict';
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const src = fs.readFileSync(
    path.join(__dirname, 'device-list.component.ts'),
    'utf8'
);

assert.ok(/subscribeVisibleTags/.test(src), 'defines subscribeVisibleTags');
assert.ok(
    /Only live-update the current page/.test(src),
    'documents page-scoped subscribe'
);
assert.ok(
    !/viewsTagsSubscribe\(Object\.keys\(tags\)\)/.test(src),
    'no longer subscribes every tag id on bind'
);
assert.ok(
    /paginator\.page\.subscribe/.test(src),
    're-subscribes when page changes'
);
assert.ok(
    /applyFilter[\s\S]*subscribeVisibleTags/.test(src),
    're-subscribes after filter'
);

// Logic check: visible slice
function visibleIds(all, pageIndex, pageSize) {
    return all.slice(pageIndex * pageSize, pageIndex * pageSize + pageSize).map(t => t.id);
}
const tags = Array.from({ length: 100 }, (_, i) => ({ id: 't' + i }));
assert.deepStrictEqual(visibleIds(tags, 0, 25).length, 25);
assert.deepStrictEqual(visibleIds(tags, 1, 25)[0], 't25');
assert.deepStrictEqual(visibleIds(tags, 3, 25).length, 25);

console.log('device-list-visible-tags: ok');
