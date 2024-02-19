const express = require("express");
const app = express();
const postRoutes = require("./routes/postRouter");
const loggerMiddleware = require("./middlewares/logger");
const errorHandlerMiddleware = require("./middlewares/errorHandler");

const PORT = 1337;

app.use(express.json());
app.use(loggerMiddleware);

app.use("/api", postRoutes);
app.use(errorHandlerMiddleware);

app.use("*", () => {
  console.log('Page not found');
})

app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
