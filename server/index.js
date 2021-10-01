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

app.listen(port, () => {
  console.log("listening at localhost:3030");
});
