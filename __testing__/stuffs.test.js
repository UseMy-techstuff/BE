const request = require('supertest');
const server = require('../api/server.js')

describe('API calls', () => {
    it('should run tests', () => {
        expect(true).toBe(true);
    });

    describe('GET api/stuffs/', () => {
        it('should return 200 OK', () => {
            return request(server)
              .get("/api/stuffs")
              .then(res => {
                expect(res.status).toBe(200);
              });
        });

        it('should return expected data', () => {
            return request(server)
              .get("/api/stuffs")
              .then(res => {
                  expect(res.body).toEqual([
                    {
                      id: 1,
                      user_id: 1,
                      item_name: "2-ton PC from the 1970's.",
                      description: "Super old, super heavy, super slow",
                      price: 10,
                      rented: 0,
                      img_url:
                        "https://cdn.instructables.com/FGR/QCQE/FVW22Q2L/FGRQCQEFVW22Q2L.LARGE.jpg"
                    },
                    {
                      id: 2,
                      user_id: 1,
                      item_name: "Waifu Mousepad",
                      description: "Feels just a little too soft.",
                      price: 1000,
                      rented: 0,
                      img_url:
                        "https://images-na.ssl-images-amazon.com/images/I/513hqBSvF%2BL._SL500_AC_SS350_.jpg"
                    },
                    {
                      id: 3,
                      user_id: 1,
                      item_name: "Ring Light",
                      description: "For all your beauty and selfie needs.",
                      price: 15,
                      rented: 0,
                      img_url:
                        "https://www.maritimebeautyshop.com/images/product/medium/456471.jpg"
                    }
                  ]);
              });
        })
    });

    describe('GET api/stuffs/:id', () => {
        it('should return 200 OK', () => {
            return request(server).get('/api/stuffs/1').then(res => {
                expect(res.status).toBe(200);
            });
        });

        it("should return expected data", () => {
          return request(server)
            .get("/api/stuffs/1")
            .then(res => {
              expect(res.body).toEqual([{
                id: 1,
                user_id: 1,
                item_name: "2-ton PC from the 1970's.",
                description: "Super old, super heavy, super slow",
                price: 10,
                rented: 0,
                img_url:
                  "https://cdn.instructables.com/FGR/QCQE/FVW22Q2L/FGRQCQEFVW22Q2L.LARGE.jpg"
              }]);
            });
        });
    });
})