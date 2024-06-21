const { expect } = require('chai');
const sinon = require('sinon');
const { checkServiceHealth, handleUnhealthyService } = require('../../../bin/app/health_check'); // Adjust the path accordingly

describe.skip('Health Check', () => {
    let serverStub;

    beforeEach(() => {
        serverStub = {
            close: sinon.stub(),
        };
    });

    it('should handle unhealthy service by retrying', async () => {
        const mongoConnectionStub = sinon.stub().resolves(null); // Simulate unhealthy connection
        const delayStub = sinon.stub().resolves();

        await handleUnhealthyService(serverStub, mongoConnectionStub, delayStub);

        // Verify that retries occur and the server is not shut down
        expect(serverStub.close.notCalled).to.be.true;
        expect(delayStub.calledThrice).to.be.true; // Assumes MAX_RETRIES = 3
    });

    it('should handle consistently unhealthy service by restarting', async () => {
        const mongoConnectionStub = sinon.stub().resolves(null); // Simulate unhealthy connection
        const delayStub = sinon.stub().resolves();

        retries = MAX_RETRIES; // Set retries to maximum

        await handleUnhealthyService(serverStub, mongoConnectionStub, delayStub);

        // Verify that the server is shut down
        expect(serverStub.close.calledOnce).to.be.true;
    });

    it('should check service health and handle healthy connection', async () => {
        const mongoConnectionStub = sinon.stub().resolves({}); // Simulate healthy connection

        await checkServiceHealth(serverStub, mongoConnectionStub);

        // Verify that the server is not shut down
        expect(serverStub.close.notCalled).to.be.true;
    });

    it('should check service health and handle unhealthy connection', async () => {
        const mongoConnectionStub = sinon.stub().resolves(null); // Simulate unhealthy connection
        const handleUnhealthyServiceStub = sinon.stub().resolves();

        await checkServiceHealth(serverStub, mongoConnectionStub, handleUnhealthyServiceStub);

        // Verify that the server is not shut down
        expect(serverStub.close.notCalled).to.be.true;
        // Verify that handleUnhealthyService is called
        expect(handleUnhealthyServiceStub.calledOnce).to.be.true;
    });
});
