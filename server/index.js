const express = require("express");
const app = express();
const cors = require("cors");
const port = 3030;
const db = require("./models.js");

app.use(express.json());
app.use(cors());

// Sort reviews (GET)
app.get("/reviews/:id/list", (req, res) => {
  //relevant, newest, helpfulness
  let id = req.params.id;
  let sort_by = req.query.sort;
  let count = req.query.count;
  Promise.all([db.sortReviews(id, sort_by, count)])
    .then((sortedReviews) => {
      res.send(sortedReviews);
    })
    .catch((errorSorting) => {
      res.send(errorSorting);
    });
});

//Get Meta Data for product (GET)
app.get("/reviews/:id/meta", (req, res) => {
  let id = req.params.id;
  Promise.all([db.getReviewMetaData(id)])
    .then((reviewMetaData) => {
      console.log("success", reviewMetaData);
      res.send(reviewMetaData[0]);
    })
    .catch((errorGettingMetaData) => {
      res.status(404).send(errorGettingMetaData);
    });
});

//Post a Review (POST)
app.post("/reviews/:id", (req, res) => {
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

  Promise.all([db.postProductReview(valuesForReviewPost)])
    .then((successfulReviewPost) => {
      res.send(successfulReviewPost);
    })
    .catch((errorPostingReview) => {
      res.status(409).send("Failed to post your review");
    });
});

// Report A Review (PUT)
app.put("/reviews/report/:id", (req, res) => {
  let id = req.params.id;
  Promise.all([db.reportProductReview(id)])
    .then((successfulReport) => {
      res.send(
        `Thanks for your feedback, review with id: ${id} has been reported`
      );
    })
    .catch((errorReportingReview) => {
      res
        .status(500)
        .send(`There was an error making a report to product with id: ${id}`);
    });
});

app.listen(port, () => {
  console.log("listening at localhost:3030");
});
