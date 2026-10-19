import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("express 시작!");
});

app.listen(4000, () => {
  console.log("서버 실행 중 : http://localhost:4000");
});