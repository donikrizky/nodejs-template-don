const VenuePresisiDomain = require('../../../../../../bin/modules/venue-presisi/repositories/commands/domain');
const VenuePresisiCommand = require('../../../../../../bin/modules/venue-presisi/repositories/commands/command');
const axios = require('axios');

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
        data: {},
        code: 200,
    };
    const resultError = {
        err: true,
        data: null,
    };

    describe('updateVenuePresisi', () => {
        //Success
        const getVenuePresisiSuccess = {status: 200, data:{
            "status": true,
            "data": [
                {
                    "provinsi": "DKI Jakarta",
                    "child": [
                        {
                            "tempat": "Stadium GBK (Gelora Bung Karno) - Jakarta Pusat",
                            "child": [
                                "Stadion Utama Gelora Bung Karno",
                                "Stadion Madya",
                                "Stadion Tenis Indoor",
                                "Istora Senayan",
                                "Ruang Cattleya Gedung Serbaguna Senayan",
                                "Ruang Vanda Gedung Serbaguna Senayan",
                                "Gedung Basket",
                                "Lapangan Hoki 1",
                                "Lapangan Hoki 2",
                                "Lapangan Panahan 1",
                                "Stadion Akuatik",
                                "Kolam Renang Akuatik"
                            ]
                        },
                        {
                            "tempat": "Taman Mini Indonesia Indah - Jakarta Timur",
                            "child": [
                                "Plaza Gajah Mada",
                                "Plaza 1",
                                "Plaza Keong Mas",
                                "Plaza Utara",
                                "Plaza Selatan",
                                "Plaza Lokomotif",
                                "Panggung Budaya",
                                "Plaza Promenade (Saujana)",
                                "Plaza Malaka",
                                "Plaza Promenade (Depan Anjungan Yogyakarta)",
                                "Sasono Utomo",
                                "Sasono Langen Budoyo",
                                "Sasono Adiguno",
                                "Sasono Manganti"
                            ]
                        },
                        {
                            "tempat": "JCC - Jakarta Pusat",
                            "child": [
                                "Assembly Hall 1",
                                "Assembly Hall 2",
                                "Assembly Hall 3",
                                "Assembly Hall Combined 1-3",
                                "Cendrawasih Room 1/3",
                                "Cendrawasih Room 1/2",
                                "Cendrawasih Room 2/3",
                                "Cendrawasih Room",
                                "Plenary Hall",
                                "Exhibition Hall A",
                                "Exhibition Hall B"
                            ]
                        },
                        {
                            "tempat": "Ancol Beach City International Stadium - Jakarta Utara",
                            "child": [
                                "Sunset Beach (Standing)",
                                "Conference Room (Standing)",
                                "Multifunction Hall",
                                "Exhibition Hall 1 Main Island (Standing)",
                                "Exhibition Hall 2 Secondary Island (Standing)",
                                "Concert Hall (Standing & Tribune)",
                                "Layout Tribune (Seat)"
                            ]
                        },
                        {
                            "tempat": "JiExpo Kemayoran (PRJ) - Jakarta Pusat",
                            "child": [
                                {
                                    "tempat": "Centre and Theatre",
                                    "child": [
                                        {
                                            "tempat": "Grand Ballroom",
                                            "child": [
                                                "Grand Ballroom 1",
                                                "Grand Ballroom 2",
                                                "Grand Ballroom 3",
                                                "Grand Ballroom 1-3"
                                            ]
                                        },
                                        {
                                            "tempat": "Junior Ballroom",
                                            "child": [
                                                "Junior Ballroom 1",
                                                "Junior Ballroom 2",
                                                "Junior Ballroom 1-2"
                                            ]
                                        },
                                        {
                                            "tempat": "Meeting Room Level 5",
                                            "child": [
                                                "Meeting Room 501",
                                                "Meeting Room 502",
                                                "Meeting Room 503",
                                                "Meeting Room 504",
                                                "Meeting Room 505",
                                                "Meeting Room 506",
                                                "Meeting Room 507",
                                                "Meeting Room 503-506"
                                            ]
                                        },
                                        {
                                            "tempat": "Meeting Room Level 6",
                                            "child": [
                                                "Meeting Room 601",
                                                "Meeting Room 602",
                                                "Meeting Room 603",
                                                "Meeting Room 604",
                                                "Meeting Room 605",
                                                "Meeting Room 606",
                                                "Meeting Room 607",
                                                "Meeting Room 603-606"
                                            ]
                                        },
                                        {
                                            "tempat": "Semeru",
                                            "child": [
                                                "Semeru 1",
                                                "Semeru 2",
                                                "Semeru 1-2"
                                            ]
                                        },
                                        {
                                            "tempat": "Lawu",
                                            "child": [
                                                "Lawu 1",
                                                "Lawu 2",
                                                "Lawu 1-2"
                                            ]
                                        },
                                        {
                                            "tempat": "Bromo",
                                            "child": [
                                                "Bromo 1",
                                                "Bromo 2",
                                                "Bromo 3",
                                                "Bromo 4",
                                                "Bromo 1-4"
                                            ]
                                        },
                                        {
                                            "tempat": "Kerinci",
                                            "child": [
                                                "Kerinci 1",
                                                "Kerinci 2",
                                                "Kerinci 3",
                                                "Kerinci 4",
                                                "Kerinci 1-4"
                                            ]
                                        },
                                        {
                                            "tempat": "Rinjani",
                                            "child": [
                                                "Rinjani 1",
                                                "Rinjani 2",
                                                "Rinjani 3",
                                                "Rinjani 1-3"
                                            ]
                                        },
                                        "Theater"
                                    ]
                                },
                                {
                                    "tempat": "East Wing Area",
                                    "child": [
                                        "Hall A1",
                                        "Hall A2",
                                        "Hall A3",
                                        "Hall A1 - A3",
                                        "Hall D1",
                                        "Hall D2"
                                    ]
                                },
                                {
                                    "tempat": "West Wing Area",
                                    "child": [
                                        "Hall B1",
                                        "Hall B2",
                                        "Hall B1-B2",
                                        "Hall C1",
                                        "Hall C2",
                                        "Hall C1-C2",
                                        "Hall B3",
                                        "Hall C3"
                                    ]
                                },
                                "Open Space - Festival",
                                "Gambri EXPO - Festival",
                                "West Parking - Festival"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "Banten",
                    "child": [
                        {
                            "tempat": "Indonesia Convention Exhibition (ICE) - Tangerang",
                            "child": [
                                "Exhibition Hall 1",
                                "Exhibition Hall 2",
                                "Exhibition Hall 3",
                                "Exhibition Hall 4",
                                "Exhibition Hall 5",
                                "Exhibition Hall 6",
                                "Exhibition Hall 7",
                                "Exhibition Hall 8",
                                "Exhibition Hall 9",
                                "Exhibition Hall 10",
                                "Convention",
                                "Plaza A",
                                "Plaza B",
                                "Plaza C"
                            ]
                        },
                        {
                            "tempat": "Community Park PIK - Tangerang",
                            "child": [
                                "Community Park A",
                                "Community Park B",
                                "Beach Community Park C",
                                "Beach Community Park D",
                                "Community Park AB",
                                "All Venue Commpark"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "Jawa Timur",
                    "child": [
                        {
                            "tempat": "Jatim Expo - Surabaya",
                            "child": [
                                "Hall A",
                                "Hall B",
                                "Hall C",
                                "Mezzanine",
                                "Meeting Room"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "Jawa Barat",
                    "child": [
                        {
                            "tempat": "Stadion Siliwangi - Bandung",
                            "child": [
                                "Siliwangi Soccer Field"
                            ]
                        },
                        {
                            "tempat": "Sentul City - Bogor",
                            "child": [
                                "Gedung Sentul International Convention Center"
                            ]
                        },
                        {
                            "tempat": "GOR Padjajaran - Bogor",
                            "child": [
                                "Stadion Padjajaran",
                                "Indoor A (Basket)",
                                "Semi Indoor (Basket 3)",
                                "Indoor B (Tenis)"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "Jawa Tengah",
                    "child": [
                        {
                            "tempat": "Komplek Halaman Sampookong Kedung Batu - Semarang",
                            "child": [
                                "Komplek Halaman Sampookong"
                            ]
                        },
                        {
                            "tempat": "Stadion Manahan - Surakarta",
                            "child": [
                                "Lapangan Sepak Bola",
                                "Lapangan Atletik",
                                "Lapangan Basket",
                                "velodrome"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "Bali",
                    "child": [
                        {
                            "tempat": "Peninsula Island - Denpasar",
                            "child": [
                                "Pulau Peninsula Nusa Dua"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "DI Yogyakarta",
                    "child": [
                        {
                            "tempat": "Halaman Parkir Barat Stadion Mandala Krida - Yogyakarta",
                            "child": [
                                "Halaman Parkir Stadion",
                                "Stadion Mandala Krida",
                                "Lapangan Basket"
                            ]
                        }
                    ]
                },
                {
                    "provinsi": "Sumatera Utara",
                    "child": [
                        {
                            "tempat": "MMTC GOR Pemprov Sumut - Medan",
                            "child": [
                                "Gor Serbaguna"
                            ]
                        }
                    ]
                }
            ],
            "msg": "Berhasil"
        }};
        it('should return success', async () => {
            const axiosGetStub = this.sandbox.stub(axios, "get").resolves(getVenuePresisiSuccess);
            this.sandbox.stub(VenuePresisiCommand.prototype, "deleteMany");

            const venuePresisi = new VenuePresisiDomain();
            const response = await venuePresisi.updateVenuePresisi();

            expect(axiosGetStub.calledOnce).to.be.true;
            expect(response.data).to.not.equal(null);
        });
        it('should return error', async () => {
            const axiosGetStub = this.sandbox.stub(axios, "get").rejects();
            this.sandbox.stub(VenuePresisiCommand.prototype, "deleteMany");

            const venuePresisi = new VenuePresisiDomain();
            const response = await venuePresisi.updateVenuePresisi();

            expect(axiosGetStub.calledOnce).to.be.true;
            expect(response.data).to.equal(null);
        });
    });

});
