const Query = require('../../../../../../bin/modules/venue/repositories/queries/query');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;

const DB = require('../../../../../../bin/helpers/databases/mongodb/db');
const db = new DB();

describe('Venue - Query', () => {

    const queryResult = {
        err: null,
        data: {},
        code: 200,
    };

    beforeEach((done) => {
        this.sandbox = sinon.createSandbox();
        done();
    });

    afterEach((done) => {
        this.sandbox.restore();
        done();
    });

    describe('findOne', () => {
        it('should return success', async () => {
            const query = new Query(db);
            this.sandbox.stub(DB.prototype, 'findOne').returns(queryResult);

            const res = await query.findOne({}, {});
            assert.notStrictEqual(res.data, null);
            assert.strictEqual(res.code, 200);
        });
    });

    describe('findMany', () => {
        it('should return success', async () => {
            const query = new Query(db);
            this.sandbox.stub(DB.prototype, 'findMany').returns(queryResult);

            const res = await query.findMany({}, {}, {}, {});
            assert.notStrictEqual(res.data, null);
            assert.strictEqual(res.code, 200);
        });
    });

    describe('count', () => {
        it('should return success', async () => {
            const query = new Query(db);
            this.sandbox.stub(DB.prototype, 'countData').returns(queryResult);

            const res = await query.count({});
            assert.notStrictEqual(res.data, null);
            assert.strictEqual(res.code, 200);
        });
    });


});
