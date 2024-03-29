const express = require("express");
const app = express();
const { list, find } = require("./postBank");
const morgan = require("morgan");

app.use(express.static("public"));
app.use(morgan('dev'));

app.get("/", (req, res) => {
  const posts = list();
  res.send(`<!DOCTYPE html>
  <html>
  <head>
    <title>Wizard News</title>
    <link rel="stylesheet" href="/style.css" />
  </head>
  <body>
    <div class="news-list">
      <header><img src="/logo.png"/>Wizard News</header>
      ${posts.map(post => `
        <div class='news-item'>
          <p>
            <span class="news-position">${post.id}. ▲</span>
            <a href="/posts/${post.id}">${post.title}</a>
            <small>(by ${post.name})</small>
          </p>
          <small class="news-info">
            ${post.upvotes} upvotes | ${post.date}
          </small>
        </div>`
      ).join('')}
    </div>
  </body>
</html>`);
});

app.get('/posts/:id', (req, res) => {
  const id = req.params.id;
  const post = find(id);
    if (!post.id) {
      res.status(404).send('Post Not found');
      return;
    } 
  res.send(
    `<html>
        <head>
          <title>Wizard News</title>
          <link rel="stylesheet" href="/style.css" />
        </head>
    <body>
    <div class="news-list">
    <header><img src="/logo.png"/>Wizard News</header>
      <div class="news-item">
      <p> ${post.title}
      <small>(by ${post.name})</small>
      </p>
      <p> ${post.content}</p>
      <p>
      <small class="news-info">
      ${post.upvotes} upvotes | ${post.date}
      </small>
      </p>
    </div>
    </body>
    </html>`
  );
});



const { PORT = 1337 } = process.env;

app.listen(PORT, () => {
  console.log(`App listening in port ${PORT}`);
});