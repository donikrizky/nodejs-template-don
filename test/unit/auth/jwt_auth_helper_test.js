// test/decodeToken.test.js

const { expect } = require('chai');
const sinon = require('sinon');
const jwt = require('jsonwebtoken');
const { decodeToken } = require('../../../bin/auth/jwt_auth_helper'); // Adjust the path accordingly

describe('decodeToken', () => {
    it('should decode a valid token', async () => {
        const req = {
            headers: {
                authorization: 'Bearer valid-token-here',
            },
        };
        const res = {}; // Mock response object (you can customize this if needed)

        // Stub the jwt.decode function to return a decoded token
        const decodeStub = sinon.stub(jwt, 'decode').returns({ userId: '123' });

        await decodeToken(req, res);

        // Verify that req.decodedToken is set correctly
        expect(req.decodedToken).to.deep.equal({ userId: '123' });

        // Restore the stub
        decodeStub.restore();
    });

    it('should handle invalid authorization', async () => {
        const req = {
            headers: {},
        };
        const res = {
            status: sinon.stub().returnsThis(), // Stub the status function
            send: sinon.stub(), // Stub the send function
        };

        await decodeToken(req, res);

        expect(res.send.calledOnce).to.be.true;
    });
});
