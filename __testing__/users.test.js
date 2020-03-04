const server = require('../api/server.js');
const request = require('supertest');

describe('User API Calls', () => {
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
        username: "test30",
        password: "pass",
        first_name: "John",
        last_name: "Doe"
      };

      it("should return status 201", () => {
        return request(server)
          .post("/api/users/register")
          .send(user)
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
    });
});