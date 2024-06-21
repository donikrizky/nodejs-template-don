const Command = require('../../../../../../bin/modules/venue-presisi/repositories/commands/command');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const assert = chai.assert;

const DB = require('../../../../../../bin/helpers/databases/mongodb/db');
const db = new DB();

describe('Venue Presisi - Command', () => {

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


    describe('insertOne', () => {
        it('should return success', async () => {
            const command = new Command(db);
            this.sandbox.stub(DB.prototype, 'insertOne').returns(queryResult);

            const res = await command.insertOne({});
            assert.notStrictEqual(res.data, null);
            assert.strictEqual(res.code, 200);
        });
    });

    describe('updateOne', () => {
        it('should return success', async () => {
            const command = new Command(db);
            this.sandbox.stub(DB.prototype, 'updateOne').returns(queryResult);

            const res = await command.updateOne({});
            assert.notStrictEqual(res.data, null);
            assert.strictEqual(res.code, 200);
        });
    });

    describe('deleteMany', () => {
        it('should return success', async () => {
            const command = new Command(db);
            this.sandbox.stub(DB.prototype, 'deleteMany').returns(queryResult);

            const res = await command.deleteMany({});
            assert.notStrictEqual(res.data, null);
            assert.strictEqual(res.code, 200);
        });
    });

});