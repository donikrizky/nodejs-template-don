const VenuePresisiQuery = require('../../../../../../bin/modules/venue-presisi/repositories/queries/query');
const VenuePresisiDomain = require('../../../../../../bin/modules/venue-presisi/repositories/queries/domain');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

describe('Venue Presisi - Domain', () => {

    beforeEach((done) => {
        this.sandbox = sinon.createSandbox();
        done();
    });

    afterEach((done) => {
        this.sandbox.restore();
        done();
    });

    const resultSuccess = {
        err: null,
        message: 'success',
        data: [{}],
        code: 200,
    };
    const resultError = {
        err: true,
        data: null,
    };


    describe('getEventById', () => {
        //Success
        const payload = {
            "eventId": "2879a076-1872-407f-95e8-5435fe2316c8"
        };
        it('should return success', async () => {
            const findOneStub = this.sandbox.stub(VenuePresisiQuery.prototype, "findOne").resolves(resultSuccess);

            const venuesPresisi = new VenuePresisiDomain();
            const response = await venuesPresisi.getEventById(payload);

            expect(findOneStub.calledOnce).to.be.true;
            expect(response.data).to.not.equal(null);
        });

        it('should return error when getEventById returns error', async () => {
            const findOneStub = this.sandbox.stub(VenuePresisiQuery.prototype, "findOne").resolves(resultError);

            const venuesPresisi = new VenuePresisiDomain();
            const response = await venuesPresisi.getEventById(payload);

            expect(findOneStub.calledOnce).to.be.true;
            expect(response.data).to.equal(null);
        });
    });

});
