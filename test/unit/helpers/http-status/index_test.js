const { expect } = require('chai');
const sinon = require('sinon');
const {httpStatus} = require('../../../../bin/helpers/http-status/index'); // Adjust the path accordingly

describe('httpStatus', () => {
    it('should have the correct status codes and messages', () => {
        // Example test case for statusOK
        const statusOK = httpStatus.statusOK;
        expect(statusOK.code).to.equal(200);
        expect(statusOK.message).to.equal('OK');

        // Test other status codes
        const statusCreated = httpStatus.statusCreated;
        expect(statusCreated.code).to.equal(201);
        expect(statusCreated.message).to.equal('Created');

        const statusNoContent = httpStatus.statusNoContent;
        expect(statusNoContent.code).to.equal(204);
        expect(statusNoContent.message).to.equal('No Content');

        const statusBadRequest = httpStatus.statusBadRequest;
        expect(statusBadRequest.code).to.equal(400);
        expect(statusBadRequest.message).to.equal('Bad Request');

        const statusUnauthorized = httpStatus.statusUnauthorized;
        expect(statusUnauthorized.code).to.equal(401);
        expect(statusUnauthorized.message).to.equal('Unauthorized');

        const statusForbidden = httpStatus.statusForbidden;
        expect(statusForbidden.code).to.equal(403);
        expect(statusForbidden.message).to.equal('Forbidden');

        const statusNotFound = httpStatus.statusNotFound;
        expect(statusNotFound.code).to.equal(404);
        expect(statusNotFound.message).to.equal('Not Found');

        const statusRequestTimeout = httpStatus.statusRequestTimeout;
        expect(statusRequestTimeout.code).to.equal(408);
        expect(statusRequestTimeout.message).to.equal('Request Timeout');

        const statusConflict = httpStatus.statusConflict;
        expect(statusConflict.code).to.equal(409);
        expect(statusConflict.message).to.equal('Conflict');

        const statusTooManyRequests = httpStatus.statusTooManyRequests;
        expect(statusTooManyRequests.code).to.equal(429);
        expect(statusTooManyRequests.message).to.equal('Too Many Requests');

        const statusInternalServerError = httpStatus.statusInternalServerError;
        expect(statusInternalServerError.code).to.equal(500);
        expect(statusInternalServerError.message).to.equal('Internal Server Error');

        const statusBadGateway = httpStatus.statusBadGateway;
        expect(statusBadGateway.code).to.equal(502);
        expect(statusBadGateway.message).to.equal('Bad Gateway');

        const statusServiceUnavailable = httpStatus.statusServiceUnavailable;
        expect(statusServiceUnavailable.code).to.equal(503);
        expect(statusServiceUnavailable.message).to.equal('Service Unavailable');

        const statusGatewayTimeout = httpStatus.statusGatewayTimeout;
        expect(statusGatewayTimeout.code).to.equal(504);
        expect(statusGatewayTimeout.message).to.equal('Gateway Timeout');

    });
});
