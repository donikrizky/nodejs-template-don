const commandHandler = require('../../../../../../bin/modules/venue-presisi/repositories/commands/command_handler');
const VenuePresisi = require('../../../../../../bin/modules/venue-presisi/repositories/commands/domain');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

describe('Venue Presisi - Command Handler', () => {

    const resultSuccess = {
        err: null,
        message: 'success',
        data: [],
        code: 200
    };

    beforeEach((done) => {
        this.sandbox = sinon.createSandbox();
        done();
    });

    afterEach((done) => {
        this.sandbox.restore();
        done();
    });

    describe('updateVenuePresisi', () => {
        it('should return success', async () => {
            this.sandbox.stub(VenuePresisi.prototype, "updateVenuePresisi").resolves(resultSuccess);

            const response = await commandHandler.updateVenuePresisi();

            expect(response.data).to.not.equal(null);
            expect(response.code).to.equal(200);
        });
    });

});
