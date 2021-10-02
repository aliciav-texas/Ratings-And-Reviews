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
      console.log("sortedReviews", sortedReviews);
      res.send("success");
    })
    .catch((errorSorting) => {
      console.log("error getting reviews");
    });
});

// "product_id": "38322",
// "ratings": {
//     "1": "9",
//     "2": "4",
//     "3": "8",
//     "4": "7",
//     "5": "21"
// },
// "recommended": {
//     "false": "18",
//     "true": "31"
// },
// "characteristics": {
//     "Fit": {
//         "id": 128427,
//         "value": "2.0000000000000000"
//     },
//     "Length": {
//         "id": 128428,
//         "value": "2.1935483870967742"
//     },
//     "Comfort": {
//         "id": 128429,
//         "value": "2.8947368421052632"
//     },
//     "Quality": {
//         "id": 128430,
//         "value": "2.8421052631578947"
//     }
// }

// Need to get total nums for all of these (ratings, recommended, characteristics)

//Get Meta Data for product (GET)
app.get("/reviews/:id/meta", (req, res) => {
  let id = req.params.id;
  res.send("hello");
  console.log(id);
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
    Date.now(),
  ];

  Promise.all([db.postProductReview(valuesForReviewPost)])
    .then((successfulReviewPost) => {
      res.send("You successfully posted a review ");
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
