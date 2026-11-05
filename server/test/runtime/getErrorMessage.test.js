const assert = require('assert');
const utils = require('../../runtime/utils');

describe('utils.getErrorMessage (#1521)', function () {
    it('returns empty string for nullish', function () {
        assert.strictEqual(utils.getErrorMessage(null), '');
        assert.strictEqual(utils.getErrorMessage(undefined), '');
    });

    it('returns strings unchanged', function () {
        assert.strictEqual(utils.getErrorMessage('Timed out'), 'Timed out');
    });

    it('uses Error.message', function () {
        assert.strictEqual(utils.getErrorMessage(new Error('Port closed')), 'Port closed');
    });

    it('does not stringify plain objects as [object Object]', function () {
        const err = { errno: -111, code: 'ECONNREFUSED', address: '127.0.0.1', port: 502 };
        const msg = utils.getErrorMessage(err);
        assert.notStrictEqual(msg, '[object Object]');
        assert.ok(msg.includes('ECONNREFUSED'), msg);
        assert.ok(msg.includes('502'), msg);
    });

    it('prefers object.message when present', function () {
        assert.strictEqual(utils.getErrorMessage({ message: 'Modbus exception 2', code: 2 }), 'Modbus exception 2');
    });
});
