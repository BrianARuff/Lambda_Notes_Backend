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
      expect(
        resp.body.notes[0].textBody.includes("The Good, the Bad and the Ugly")
      ).toBe(true);
    });
  });

  describe("at POST /api/notes", () => {
    it("should have a response of 500 when no args are sent with post request", async () => {
      const resp = await request(server).post("/api/notes");
      expect(resp.status).toBe(500);
    });
    it("should return response status of 201 when post is succesful", async () => {
      const resp = await request(server)
        .post("/api/notes")
        .send({
          tags: JSON.stringify(["one", "two", "three"]),
          title: Math.random() * 10000,
          textBody: Math.random() * 10000
        });
      expect(resp.status).toBe(201);
    });
  });

  describe("at DELETE /api/notes", () => {
    it("should have resposne of 200 when delete is successful", async () => {
      const notes = await request(server).get("/api/notes");
      const notesList = notes.body.notes;
      const resp = await request(server).del(`/api/notes/${notesList[notesList.length - 1].id}`);
      expect(resp.status).toBe(200);
    });
    it("should return 404 when id is not found", async () => {
      const resp = await request(server).del("/api/notes/:id");
      expect(resp.status).toBe(401);
    });
  });

  describe("at PUT /api/notes", () => {
    it("should have a response of 200 when an update is passed", async () => {
      const notes = await request(server).get("/api/notes");
      const notesList = notes.body.notes;
      const resp = await request(server).put(`/api/notes/${notesList[notesList.length - 1].id}`).send({tags: JSON.stringify([1, 2, 3]), title: "Updated Title", textBody: "Update Text Body"});
      expect(resp.status).toBe(200);
    })
  })
});
