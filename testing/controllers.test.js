const supertest = require("supertest");
const app = require("../server/controllers.js");
const request = supertest(app);

// ==== Test Values ==== //
const validID = 38323;
const invalidID = 1234567890987654321;
const nonReportedReviewID = 131;
const validReview = {
  rating: 0,
  summary: "summary",
  body: "body",
  recommend: true,
  name: "testName",
  email: "testEmail",
  photos: ["testUrl"],
  characteristics: [],
};
const invalidReview = {};
const testPostID = 38322000;

// ==== Test for GET request for Meta data
describe("GET meta data", () => {
  describe("given an exisiting id return an object of meta data", () => {
    // === Successful Responses
    test("should respond with a 200 status code", async () => {
      const response = await request.get(`/reviews/${validID}/meta`);
      expect(response.statusCode).toBe(200);
    });
    test("should respond with the product_id ", async () => {
      const response = await request.get(`/reviews/${validID}/meta`);
      expect(response.body.product_id).toBe(validID.toString());
    });
    test("should respond with array properties for ratings, recommended and characteristics", async () => {
      const response = await request.get(`/reviews/${validID}/meta`);
      expect(Array.isArray(response.body.ratings)).toBe(true);
      expect(Array.isArray(response.body.recommended)).toBe(true);
      expect(Array.isArray(response.body.characteristics)).toBe(true);
    });
  });
  // === Error Responses
  describe("given an invalid ID", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request.get(`/reviews/${invalidID}/meta`);
      expect(response.statusCode).toBe(404);
    });
  });
});

// ==== Test for PUT request to update reported boolen to true
describe("Report a review", () => {
  describe("given an exisiting id, update that products reported value to 'true'", () => {
    // === Successful Responses
    test("should respond with a 200 status code", async () => {
      const response = await request.put(
        `/reviews/report/${nonReportedReviewID}`
      );
      expect(response.statusCode).toBe(204);
    });

    test("should respond with an object", async () => {
      const response = await request.put(
        `/reviews/report/${nonReportedReviewID}`
      );
      expect(typeof response.body).toBe("object");
    });
  });
  // === Error Responses
  describe("given an invalid ID", () => {
    test("should respond with a 404 status code", async () => {
      const response = await request.put(`/reviews/report/${invalidID}`);
      expect(response.statusCode).toBe(500);
    });
  });
});

// ==== Test for POST request
describe("Post a review", () => {
  test("POST a new review ", async () => {
    const postedReview = await request
      .post(`/reviews/${testPostID}`)
      .send(validReview);
    expect(postedReview.statusCode).toBe(202);
  });

  describe("Find the posted review", () => {
    test("should respond with a 200 status code", async () => {
      const response = await request.get(`/reviews/${testPostID}/meta`);
      expect(response.statusCode).toBe(200);
    });
    test("should respond with the product_id ", async () => {
      const response = await request.get(`/reviews/${testPostID}/meta`);
      expect(response.body.product_id).toBe(testPostID.toString());
    });
  });
});

// ==== Test for sorted reviews
describe("GET sorted reviews", () => {
  describe("given an exisiting id return a sorted array of objects", () => {
    // === Successful Responses
    test("should respond with a 200 status code", async () => {
      const response = await request
        .get(`/reviews/${validID}/list`)
        .query({ sort: "relevant", count: 5 });
      expect(response.statusCode).toBe(200);
    });
    test("should responsd with an Array", async () => {
      const response = await request
        .get(`/reviews/${validID}/list`)
        .query({ sort: "relevant", count: 5 });
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
