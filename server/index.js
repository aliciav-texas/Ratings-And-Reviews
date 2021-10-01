const express = require("express");
const app = express();
const cors = require("cors");
const port = 3030;
const db = require("./models.js");

app.use(express.json());
app.use(cors());

app.put("/reviews/report/:id", (req, res) => {
  let id = req.params.id;
  console.log(id);
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
