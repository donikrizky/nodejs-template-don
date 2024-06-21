const apisHandler = require('../../../../../bin/modules/venue-presisi/handlers/api_handler');
const commandHandler = require('../../../../../bin/modules/venue-presisi/repositories/commands/command_handler');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const httpMocks = require('node-mocks-http');

describe('Event - Api Handler', () => {

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


    describe('updateVenuePresisi', () => {
        it('should return success when payload is valid and isDraft is true', async () => {
            req = httpMocks.createRequest({user:{}, body: {isDraft: true}});
            this.sandbox.stub(commandHandler, "updateVenuePresisi").resolves(resultSuccess);

            await apisHandler.updateVenuePresisi(req, res);

            expect(res.statusCode).to.equal(200);
        });

    });

});
