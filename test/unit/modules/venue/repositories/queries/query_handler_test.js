const queryHandler = require('../../../../../../bin/modules/venue/repositories/queries/query_handler');
const Venue = require('../../../../../../bin/modules/venue/repositories/queries/domain');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

describe('Venue - Query Handler', () => {

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

    
    describe('getVenueById', () => {
        it('should return success', async () => {
            this.sandbox.stub(Venue.prototype, "getVenueById").resolves(resultSuccess);

            const response = await queryHandler.getVenueById();

            expect(response.data).to.not.equal(null);
            expect(response.code).to.equal(200);
        });
    });

    describe('getVenueBanners', () => {
        it('should return success', async () => {
            this.sandbox.stub(Venue.prototype, "getVenueBanners").resolves(resultSuccess);

            const response = await queryHandler.getVenueBanners();

            expect(response.data).to.not.equal(null);
            expect(response.code).to.equal(200);
        });
    });

    describe('getVenueByRegion', () => {
        it('should return success', async () => {
            this.sandbox.stub(Venue.prototype, "getVenueByRegion").resolves(resultSuccess);

            const response = await queryHandler.getVenueByRegion();

            expect(response.data).to.not.equal(null);
            expect(response.code).to.equal(200);
        });
    });
});