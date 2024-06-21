const apisHandler = require('../../../../../bin/modules/venue/handlers/api_handler');
const validator = require('../../../../../bin/helpers/utils/validator');
const queryHandler = require('../../../../../bin/modules/venue/repositories/queries/query_handler');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const httpMocks = require('node-mocks-http');

describe('Venue - Api Handler', () => {

    const resultSuccess = {
        err: null,
        message: 'success',
        data: [],
        code: 200,
    };
    let resultError = {
        err: {},
    };
    let req, res;

    beforeEach((done) => {
        req = httpMocks.createRequest({user:{}});
        res = httpMocks.createResponse({});
        this.sandbox = sinon.createSandbox();
        done();
    });
    afterEach((done) => {
        this.sandbox.restore();
        done();
    });


    describe('getVenueById', () => {
        it('should return success when payload is valid', async () => {
            req = httpMocks.createRequest({user:{}, body: {isDraft: true}});
            const isValidPayloadStub = this.sandbox.stub(validator, "isValidPayload").resolves(resultSuccess);
            this.sandbox.stub(queryHandler, "getVenueById").resolves(resultSuccess);

            await apisHandler.getVenueById(req, res);

            expect(isValidPayloadStub.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
        });

        it('should directly return response when validation is error', async () => {
            const isValidPayloadStub = await this.sandbox.stub(validator, "isValidPayload").resolves(resultError);

            await apisHandler.getVenueById(req, res);

            expect(isValidPayloadStub.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
        });
    });

    describe('getVenueBanners', () => {
        it('should return success when payload is valid', async () => {
            req = httpMocks.createRequest({user:{}, body: {isDraft: true}});
            const isValidPayloadStub = this.sandbox.stub(validator, "isValidPayload").resolves(resultSuccess);
            this.sandbox.stub(queryHandler, "getVenueBanners").resolves(resultSuccess);

            await apisHandler.getVenueBanners(req, res);

            expect(isValidPayloadStub.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
        });

        it('should directly return response when validation is error', async () => {
            const isValidPayloadStub = await this.sandbox.stub(validator, "isValidPayload").resolves(resultError);

            await apisHandler.getVenueBanners(req, res);

            expect(isValidPayloadStub.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
        });
    });

    describe('getVenueByRegion', () => {
        it('should return success when payload is valid', async () => {
            req = httpMocks.createRequest({user:{}, body: {isDraft: true}});
            const isValidPayloadStub = this.sandbox.stub(validator, "isValidPayload").resolves(resultSuccess);
            this.sandbox.stub(queryHandler, "getVenueByRegion").resolves(resultSuccess);

            await apisHandler.getVenueByRegion(req, res);

            expect(isValidPayloadStub.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
        });

        it('should directly return response when validation is error', async () => {
            const isValidPayloadStub = await this.sandbox.stub(validator, "isValidPayload").resolves(resultError);

            await apisHandler.getVenueByRegion(req, res);

            expect(isValidPayloadStub.calledOnce).to.be.true;
            expect(res.statusCode).to.equal(200);
        });
    });

});
