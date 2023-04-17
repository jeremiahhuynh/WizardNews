const express = require("express");
const app = express();
const { list, find } = require("./postBank");
const morgan = require("morgan");

app.use(morgan("dev"));

app.get("/", (req, res) => {
  const posts = list();
  res.send(`<html>
  <head>
    <link rel="stylesheet" href="/style.css" />
    <title>Wizard News</title>
  </head>
  <body>
    <h1>Wizard News</h1>
    <ul>
   ${posts
     .map((post) => {
       return `<li>${post.title}</li>`;
     })
     .join("")}

    </ul>
  </body>
</html>`);
res.send(html);
});

const PORT = 1337;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});