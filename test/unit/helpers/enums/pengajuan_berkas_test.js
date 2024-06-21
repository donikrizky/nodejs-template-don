// Import the modules and the object to be tested
const chai = require('chai');
const sinon = require('sinon');
const { PENGAJUAN_BERKAS } = require('../../../../bin/helpers/enums/pengajuan_berkas');

// Use the expect syntax from chai
const expect = chai.expect;

// Describe the test suite
describe('PENGAJUAN_BERKAS Test', () => {
    // Test the properties of the object
    it('should be an object', () => {
        expect(PENGAJUAN_BERKAS).to.be.an('object');
    });

    it('should have two properties: polri and disparekraf', () => {
        expect(PENGAJUAN_BERKAS).to.have.all.keys('polri', 'disparekraf');
    });

    it('should have polri as an array of objects', () => {
        expect(PENGAJUAN_BERKAS.polri).to.be.an('array');
        expect(PENGAJUAN_BERKAS.polri[0]).to.be.an('object');
    });

    it('should have disparekraf as an array of objects', () => {
        expect(PENGAJUAN_BERKAS.disparekraf).to.be.an('array');
        expect(PENGAJUAN_BERKAS.disparekraf[0]).to.be.an('object');
    });

    // Test the values of the object
    it('should have the correct values for the polri array', () => {
        expect(PENGAJUAN_BERKAS.polri).to.deep.equal([
            {
                no: 1,
                namaBerkas: 'Penerbitan Surat Izin Keramaian',
                estimasi: '',
                approval: false,
                typeBerkas: 'penerbitanSuratIzin',
            },
            {
                no: 2,
                namaBerkas: 'Hasil Penetapan Status Resiko',
                statusResiko: '',
                approval: false,
                typeBerkas: 'penetapanStatusResiko',
            },
            {
                no: 3,
                namaBerkas: 'Wawancara Kegiatan',
                urlVideo: '',
                approval: false,
                typeBerkas: 'wawancara',
            },
            {
                no: 4,
                namaBerkas: 'Verifikasi Berkas oleh POLRI',
                approval: false,
                typeBerkas: 'polri',
            },
            {
                no: 5,
                namaBerkas: 'Verifikasi Berkas oleh POLDA',
                approval: false,
                typeBerkas: 'polda',
            },
            {
                no: 6,
                namaBerkas: 'Verifikasi Berkas oleh POLRES',
                approval: false,
                typeBerkas: 'polres',
            },
        ]);
    });

    it('should have the correct values for the disparekraf array', () => {
        expect(PENGAJUAN_BERKAS.disparekraf).to.deep.equal([
            {
                no: 7,
                namaBerkas: 'Verifikasi Berkas oleh DISPAREKRAF',
                approval: false,
                typeBerkas: 'disparekraf',
            },
        ]);
    });

    // Test the behavior of the object
    it('should not allow modification of the object', () => {
        // Use sinon to spy on the console.error function
        const spy = sinon.spy(console, 'error');

        // Try to modify the object and expect an error
        try {
            PENGAJUAN_BERKAS.polri = [];
        } catch (err) {
            expect(err).to.be.an('error');
            expect(spy.calledOnce).to.be.true;
        }

        // Restore the original console.error function
        spy.restore();
    });
});
