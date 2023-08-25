import bodyParser from "body-parser";
import { randomBytes } from "crypto";
import express from "express";

const app = express();

app.use(bodyParser.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { id } = req.params;
  const { content } = req.body;
  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;
  res.status(201).send(comments);
});

app.get("/posts/:id/comments/:commentId", (req, res) => {
  const { id, commentId } = req.params;
});

app.listen(4001, (req, res) => {
  console.log("service comments listen on 4001");
});
