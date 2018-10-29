const server = require("../server");
const request = require("supertest");

describe("Notes API", () => {
  describe("at GET /api/notes", () => {
    it("should have a response status of 200", async () => {
      const resp = await request(server).get("/api/notes");
      expect(resp.status).toBe(200);
    });
    it("should return an object with a message prop that says 'Notes found'", async () => {
      const resp = await request(server).get("/api/notes");
      expect(resp.body.message).toBe("Notes found");
    });
    it("should return an object with a notes prop that holds an array of notes", async () => {
      const resp = await request(server).get("/api/notes");
      expect(Array.isArray(resp.body.notes)).toBe(true);
    });
    it("should have a first note with a title of 'The Good, the Bad and the Ugly'", async () => {
      const resp = await request(server).get("/api/notes");
      expect(resp.body.notes[0].title).toBe("The Good, the Bad and the Ugly");
    });
    it(`should have a first note with a textBody that includes with 'The Good, the Bad and the Ugly'`, async () => {
      const resp = await request(server).get("/api/notes");
      expect(resp.body.notes[0].textBody.includes("The Good, the Bad and the Ugly")).toBe(true);
    });
  });
});
