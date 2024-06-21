const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;
const rewire = require('rewire');
const fileCheckRewire = rewire('../../../../bin/helpers/utils/file-check');
const fileCheckRequire = require('../../../../bin/helpers/utils/file-check');

const fs = require('fs');


describe('File Check', () => {

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
        this.sandbox = sinon.createSandbox();
        done();
    });
    afterEach((done) => {
        this.sandbox.restore();
        done();
    });


    describe('fileCheck', () => {
        it('should return mimeTypeError when detectFileTypeResult is false', async () => {
            let detectFileTypeStub = this.sandbox.stub().resolves(false);
            let detectFileTypeRewire = fileCheckRewire.__set__('detectFileType', detectFileTypeStub);

            const result = await fileCheckRequire.fileCheck()

            expect(result.mimeTypeError).to.be.true;
            expect(result.containCodeError).to.be.false;
            detectFileTypeRewire();
        });

        it.skip('should return containCodeError when PDF contains JavaScript or HTML', async () => {
            const detectFileTypeStub = this.sandbox.stub().resolves('application/pdf');
            let detectFileTypeRewire = fileCheckRewire.__set__('detectFileType', detectFileTypeStub);

            this.sandbox.stub(fs, 'readFileSync').resolves(resultSuccess);

            const trueStub = this.sandbox.stub().resolves(true);
            let containsJavascriptRewire = fileCheckRewire.__set__('containsJavascript', trueStub);
            let containsHTMLRewire = fileCheckRewire.__set__('containsHTML', trueStub);

            const result = await fileCheckRequire.fileCheck()

            expect(result.mimeTypeError).to.be.false;
            expect(result.containCodeError).to.be.true;

            // Restore the stubs
            fs.readFileSync.restore();
            detectFileTypeRewire();
            containsJavascriptRewire();
            containsHTMLRewire();

        });

    });

    describe('containsJavascript', () => {
        it('should detect JavaScript code in the PDF text', async () => {
            const pdfText = '<script>alert("Hello, world!");</script>';

            const containsJavascript = fileCheckRewire.__get__('containsJavascript');
            const result = await containsJavascript(pdfText)

            expect(result).to.equal(true);
        });

        it('should not detect JavaScript code if absent', async () => {
            const pdfText = 'This is a regular PDF text without any scripts.';

            const containsJavascript = fileCheckRewire.__get__('containsJavascript');
            const result = await containsJavascript(pdfText);

            expect(result).to.be.false;
        });
    });

    describe('containsHTML', () => {
        it('should detect HTML code in the PDF text', async () => {
            const pdfText = '<a href="javascript:alert(\'XSS attack!\')">Click me</a>';

            const containsHTML = fileCheckRewire.__get__('containsHTML');
            const result = await containsHTML(pdfText);

            expect(result).to.be.true;
        });

        it('should not detect HTML code if absent', async () => {
            const pdfText = 'This is a regular PDF text without any HTML tags.';

            const containsHTML = fileCheckRewire.__get__('containsHTML');
            const result = await containsHTML(pdfText);

            expect(result).to.be.false;
        });
    });

    describe('detectFileType', () => {
        it.skip('should correctly identify PDF files', () => {
            // Create a custom buffer with the PDF magic number (25 50 44 46)
            const pdfMagicNumber = Buffer.from([0x25, 0x50, 0x44, 0x46]);

            // Stub the fs.readFileSync function to return our custom buffer
            const readFileSyncStub = this.sandbox.stub(fs, 'readFileSync').resolves(pdfMagicNumber);

            // Call the detectFileType function
            const filePath = '/path/to/sample.pdf'; // This path is not used in the test

            const detectFileType = fileCheckRewire.__get__('detectFileType');
            const result = detectFileType(filePath);

            // Assert that the result matches the expected MIME type
            expect(result).to.equal('application/pdf');

            // Restore the stub
            readFileSyncStub.restore();
        });
    });
});
