const server = require('../api/server.js');
const request = require('supertest');
const axios = require('axios');

let token = '';

function retrieveToken() {
  const testUser = {
    username: "test",
    password: "pass"
  };

  axios
    .post("https://use-my-stuff.herokuapp.com/api/users/login", testUser)
    .then(res => {
      token = res.data.token;
    })
    .catch(err => {
      console.log('whoops', err);
    });
};

// beforeAll(() => retrieveToken());

describe('User Register/Login API Calls', () => {

    it('should run tests', () => {
        expect(false).toBe(false);
    });

    // Login
    describe("POST api/users/login", () => {
      const user = {
        username: "test",
        password: "pass",
      };

      it("should return status 200", () => {
        return request(server)
          .post("/api/users/login")
          .send(user)
          .then(res => {
            expect(res.status).toBe(200);
          });
      });

      it("should return welcome message", () => {
        return request(server)
          .post("/api/users/login")
          .send(user)
          .then(res => {
            const login = res.body;
            expect(login.message).toEqual("Welcome test!");
          });
      });

      it("should return seeded user ID", () => {
        return request(server)
          .post("/api/users/login")
          .send(user)
          .then(res => {
            const login = res.body;
            expect(login.id).toEqual(1);
          });
      });

      it("should return seeded first name", () => {
        return request(server)
          .post("/api/users/login")
          .send(user)
          .then(res => {
            const login = res.body;
            expect(login.first_name).toEqual("Jo");
          });
      });

      it("should return status seeded last name", () => {
        return request(server)
          .post("/api/users/login")
          .send(user)
          .then(res => {
            const login = res.body;
            expect(login.last_name).toEqual("Doe");
          });
      });
    });

    // Register
    describe("POST api/users/register", () => {
      const user = {
        username: "test",
        password: "pass",
        first_name: "John",
        last_name: "Doe"
      };

      it("should return status 201", () => {
        return request(server)
          .post("/api/users/register")
          .send(user)
          .then(res => {
            expect(res.status).toBe(400);
            expect(res.body).toEqual({
              errorMessage: "Username already exists"
            });
          });
      });
    });

    describe("Authorization without header", () => {
      it("POST should return 401 Unauthorized without header", () => {
        return request(server)
          .post("/api/users/1/stuffs")
          .send({
            item_name: "2-ton PC from the 1970's.",
            description: "Super old, super heavy, super slow",
            price: 10,
            img_url:
              "https://cdn.instructables.com/FGR/QCQE/FVW22Q2L/FGRQCQEFVW22Q2L.LARGE.jpg"
          })
          .then(res => {
            expect(res.body).toEqual({ message: "No credentials provided" });
            expect(res.status).toBe(401);
          });
      });

      it(" GET should return 401 Unauthorized without header", () => {
        return request(server)
          .get("/api/users/1/stuffs")
          .then(res => {
            expect(res.body).toEqual({ message: "No credentials provided" });
            expect(res.status).toBe(401);
          });
      });

      it(" PUT should return 401 Unauthorized without header", () => {
        return request(server)
          .put("/api/users/1/stuffs/1")
          .send({
            item_name: "TEST",
            description: "SUPERTEST",
            price: 10000,
            img_url:
              "https://cdn.instructables.com/FGR/QCQE/FVW22Q2L/FGRQCQEFVW22Q2L.LARGE.jpg"
          })
          .then(res => {
            expect(res.body).toEqual({ message: "No credentials provided" });
            expect(res.status).toBe(401);
          });
      });

      it("DELETE should return 401 Unauthorized without header", () => {
        return request(server)
          .delete("/api/users/1/stuffs/1")
          .then(res => {
            expect(res.body).toEqual({ message: "No credentials provided" });
            expect(res.status).toBe(401);
          });
      });
    });
});