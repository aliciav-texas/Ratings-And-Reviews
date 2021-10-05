const { app } = require("./routers.js");
const port = 3030;

app.listen(port, () => {
  console.log("listening at localhost:3030");
});
