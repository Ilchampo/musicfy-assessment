import request from 'supertest';
import app from '../dist/Application'

describe("Test Application Endpoints", () => {

  it("Get Albums", async () => {
    const response = await request(app).get("/album/get");
    const body = response.body
    expect(response.statusCode).toBe(200);
    expect(body.payload).toBeDefined();
  });

  it("Get Songs", async () => {
    const response = await request(app).get("/songs/get");
    const body = response.body
    expect(response.statusCode).toBe(200);
    expect(body.payload).toBeDefined();
  });

  it("Get Album by Id", async () => {
    const response = await request(app).get("/album/get/11");
    expect(response.statusCode).toBe(200);
    expect(response.body.payload.name).toBe('The English Riviera');
    expect(response.body.payload.artist).toBe('Metronomy');
  });

  it("Get Songs by Id", async () => {
    const response = await request(app).get("/song/get/11");
    expect(response.statusCode).toBe(200);
    expect(response.body.payload).toBeDefined();
    expect(response.body.payload.albumId).toBe(11);
  });
});