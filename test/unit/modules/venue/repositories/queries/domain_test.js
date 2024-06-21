const VenueDomain = require('../../../../../../bin/modules/venue/repositories/queries/domain');
const VenueQuery = require('../../../../../../bin/modules/venue/repositories/queries/query');
const Storaging = require('../../../../../../bin/helpers/components/storaging/index');

const {describe, beforeEach, afterEach, it} = require("mocha");
const sinon = require("sinon");
const chai = require("chai");
const expect = chai.expect;

describe('Venue - Domain', () => {

    let originalGlobalBucketName;
    let originalGlobalSortCreatedAt;

    beforeEach((done) => {
        originalGlobalBucketName = global.globalBucketName; // save the original value
        originalGlobalSortCreatedAt = global.globalSortCreatedAt; // save the original value
        global.globalBucketName = sinon.spy(); // replace globalVar with a spy
        global.globalSortCreatedAt = sinon.spy(); // replace globalVar with a spy
        this.sandbox = sinon.createSandbox();
        done();
    });

    afterEach((done) => {
        global.globalBucketName = originalGlobalBucketName; // restore the original value
        global.globalSortCreatedAt = originalGlobalSortCreatedAt; // restore the original value
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


    describe('getVenueById', () => {
        //Success
        const payload = {
            "venueId": "2879a076-1872-407f-95e8-5435fe2316c8"
        };
        it('should return success', async () => {
            const venueFindOneStub = this.sandbox.stub(VenueQuery.prototype, "findOne").resolves(resultSuccess);

            const venue = new VenueDomain();
            const response = await venue.getVenueById(payload);

            expect(venueFindOneStub.calledOnce).to.be.true;
            expect(response.data).to.not.equal(null);
        });

        it('should return error when getVenueById returns error', async () => {
            const venueFindOneStub = this.sandbox.stub(VenueQuery.prototype, "findOne").resolves(resultError);

            const venue = new VenueDomain();
            const response = await venue.getVenueById(payload);

            expect(venueFindOneStub.calledOnce).to.be.true;
            expect(response.data).to.equal(null);
        });
    });

    describe('getVenueBanners', () => {
        //Success
        const payload = {
            "isDeleted": false,
            "page": 1,
            "limit": 100
        };
        const findManySuccess = {
            "err": null,
            "data": [
                {
                    "venueId": "6c38f6d2-5736-41d4-bfba-c7709d666b98",
                    "venueName": "Ancol Beach City International Stadium - Jakarta Utara",
                    "email": "spbe23@yopmail.com",
                    "phone": "082137797779",
                    "bannerPicPath": "venue/banner/beach-city.jpg",
                    "isDefault": false,
                    "isActive": true
                },
                {
                    "venueId": "f7d5bd13-5378-4a41-a31d-2c0e8f10c452",
                    "venueName": "JiExpo Kemayoran (PRJ) - Jakarta Pusat",
                    "email": "spbe23@yopmail.com",
                    "phone": "02126645000",
                    "bannerPicPath": "venue/banner/jiexpo.jpg",
                    "isDefault": false,
                    "isActive": true
                },
                {
                    "venueId": "0d8bb9ad-5010-45ed-a25a-9b82b2d2a5ac",
                    "venueName": "Taman Mini Indonesia Indah - Jakarta Timur",
                    "email": "spbe23@yopmail.com",
                    "phone": "081219616358",
                    "bannerPicPath": "venue/banner/tmii.jpg",
                    "isDefault": false,
                    "isActive": true
                },
                {
                    "venueId": "f61e0d65-a7ca-4a32-8f5b-73c7096f076a",
                    "venueName": "Community Park PIK - Tangerang",
                    "email": "spbe23@yopmail.com",
                    "phone": "02122570999",
                    "bannerPicPath": "venue/banner/pik-avenue.jpg",
                    "isDefault": false,
                    "isActive": true
                },
                {
                    "venueId": "0aa392bb-8d0d-4720-aad8-d068b0cc4d87",
                    "venueName": "Stadium GBK (Gelora Bung Karno) - Jakarta Pusat",
                    "email": "spbe23@yopmail.com",
                    "phone": "0215701862",
                    "bannerPicPath": "venue/banner/gbk.jpg",
                    "isDefault": true,
                    "isActive": true
                },
                {
                    "venueId": "e84af3d1-50f5-40ef-8662-ea0130f692d4",
                    "venueName": "Indonesia Convention Exhibition (ICE) - Tangerang",
                    "email": "spbe23@yopmail.com",
                    "phone": "02129714664",
                    "bannerPicPath": "venue/banner/ice-bsd.jpg",
                    "isDefault": false,
                    "isActive": true
                },
                {
                    "venueId": "d0f4e61b-ed50-4234-ae28-ac4ef0af1174",
                    "venueName": "JCC - Jakarta Pusat",
                    "email": "spbe23@yopmail.com",
                    "phone": "0215726000",
                    "bannerPicPath": "venue/banner/jcc.jpg",
                    "isDefault": false,
                    "isActive": true
                }
            ]
        };
        const getDocumentSuccess = {
            "err": null,
            "data": "link_picture_dummy"
        };
        it('should return success', async () => {
            const venueFindManyStub = this.sandbox.stub(VenueQuery.prototype, "findMany").resolves(findManySuccess);
            const getDocumentStub = this.sandbox.stub(Storaging.prototype, "getDocument").resolves(getDocumentSuccess);

            const venue = new VenueDomain();
            const response = await venue.getVenueBanners(payload);

            expect(venueFindManyStub.calledOnce).to.be.true;
            expect(getDocumentStub.called).to.be.true;
            expect(response.data).to.not.equal(null);
        });

        it('should return success when findMany returns error', async () => {
            const venueFindManyStub = this.sandbox.stub(VenueQuery.prototype, "findMany").resolves(resultError);

            const venue = new VenueDomain();
            const response = await venue.getVenueBanners(payload);

            expect(venueFindManyStub.calledOnce).to.be.true;
            expect(response.data).to.not.equal(null);
        });
    });

    describe('getVenueByRegion', () => {
        //Success
        const payload = {
            "regionType": "Provinsi",
            "regionId": 1,
            "except": [
            "6c38f6d2-5736-41d4-bfba-c7709d666b98",
            "f7d5bd13-5378-4a41-a31d-2c0e8f10c452",
            "f61e0d65-a7ca-4a32-8f5b-73c7096f076a"
        ],
            "isDeleted": false,
            "page": 1,
            "limit": 100
    };
        const findManySuccess = {
            "err": null,
            "data": [
                {
                    "venueId": "0d8bb9ad-5010-45ed-a25a-9b82b2d2a5ac",
                    "venueName": "Taman Mini Indonesia Indah - Jakarta Timur",
                    "isActive": true
                },
                {
                    "venueId": "0aa392bb-8d0d-4720-aad8-d068b0cc4d87",
                    "venueName": "Stadium GBK (Gelora Bung Karno) - Jakarta Pusat",
                    "isActive": true
                },
                {
                    "venueId": "d0f4e61b-ed50-4234-ae28-ac4ef0af1174",
                    "venueName": "JCC - Jakarta Pusat",
                    "isActive": true
                }
            ]
        };
        it('should return success when regionType is Provinsi', async () => {
            const venueFindManyStub = this.sandbox.stub(VenueQuery.prototype, "findMany").resolves(findManySuccess);

            const venue = new VenueDomain();
            const response = await venue.getVenueByRegion(payload);

            expect(venueFindManyStub.calledOnce).to.be.true;
            expect(response.data).to.not.equal(null);
        });

        it('should return success when regionType is Kota/Kab', async () => {
            const payloadHere = {
                "regionType": "Kota/Kab",
                "regionId": 1,
                "except": [
                    "6c38f6d2-5736-41d4-bfba-c7709d666b98",
                    "f7d5bd13-5378-4a41-a31d-2c0e8f10c452",
                    "f61e0d65-a7ca-4a32-8f5b-73c7096f076a"
                ],
                "isDeleted": false,
                "page": 1,
                "limit": 100
            };
            const venueFindManyStub = this.sandbox.stub(VenueQuery.prototype, "findMany").resolves(resultError);

            const venue = new VenueDomain();
            const response = await venue.getVenueByRegion(payloadHere);

            expect(venueFindManyStub.calledOnce).to.be.true;
            expect(response.data).to.not.equal(null);
        });
    });

});
