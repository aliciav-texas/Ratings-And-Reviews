const express = require("express");
const app = express();
const cors = require("cors");
const db = require("./models.js");

app.use(express.json());
app.use(cors());

// Sort reviews (GET)
app.get("/reviews/:id/list", async (req, res) => {
  try {
    //relevant, newest, helpfulness
    let id = req.params.id;
    let sort_by = req.query.sort;
    let count = req.query.count;

    const sortedReviews = await db.sortReviews(id, sort_by, count);
    res.send(sortedReviews);
  } catch (errorSorting) {
    res.status(400).send(errorSorting);
  }
});

//Get Meta Data for product (GET)
app.get("/reviews/:id/meta", async (req, res) => {
  let id = req.params.id;
  try {
    const reviewMetaData = await db.getReviewMetaData(req.params.id);
    res.send(reviewMetaData);
  } catch (errorGettingMetaData) {
    res.status(404).send(errorGettingMetaData);
  }
});

//Post a Review (POST)
app.post("/reviews/:id", async (req, res) => {
  let id = req.params.id;
  let valuesForReviewPost = [
    id,
    req.body.rating,
    req.body.summary,
    req.body.body,
    req.body.recommend,
    false,
    req.body.name,
    req.body.email,
    null,
    0,
  ];
  try {
    const successfulReviewPost = await db.postProductReview(
      valuesForReviewPost
    );
    res.status(202).send(successfulReviewPost);
  } catch (errorPostingReview) {
    res.status(409).send("Failed to post your review");
  }
});

// Report A Review (PUT)
app.put("/reviews/report/:id", async (req, res) => {
  try {
    let id = req.params.id;
    const successfulReport = await db.reportProductReview(id);
    res.status(204).send(successfulReport);
  } catch (errorReportingReview) {
    res
      .status(500)
      .send(`There was an error making a report to product with id: ${id}`);
  }
});

module.exports = app;
