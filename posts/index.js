import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import express from "express";

const app = express();

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts);
});

app.get("/posts/:id", (req, res) => {
  console.log(req.params);
  const post = posts[req.params.id];
  if (!post) {
    res.status(404).json({ message: "Not found" });
  }
  res.send(post);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = { id, title };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("sever listen on port 4000");
});
