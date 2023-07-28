const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
const logger = require("morgan");

app.use(logger("dev"));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.get("/", async (req, res) => {
  const files = fs.readdirSync(path.join(__dirname, "uploads"));
  let render = "";
  files.forEach((e) => {
    render += `<li> <a href="http://${
      req.headers.host
    }/uploads/${encodeURIComponent(e)}" download>${e}</a> </li>`;
  });
  res.status(200).send(`
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <ul>      
    ${render}    
    </ul>
</body>
</html>
    `);
});
app.listen(8000, () => {
  console.log("server running on port 8000");
});
