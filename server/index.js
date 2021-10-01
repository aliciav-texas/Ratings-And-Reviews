const express = require("express");
const app = express();
const cors = require("cors");
const port = 3030;
const db = require("./models.js");

app.use(express.json());
app.use(cors());

app.get("/reviews", (req, res) => {
  Promise.all([db.getTestReview(1)])
    .then((resultOfTest) => {
      console.log("server", resultOfTest);
      res.send(resultOfTest);
    })
    .catch((errorOnTest) => {
      res.status(500).send(errorOnTest);
    });
});

app.put("/report", (req, res) => {
  Promise.all([db.reportProductReview(1)])
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
