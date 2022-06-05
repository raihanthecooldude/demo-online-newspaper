const express = require("express");
const Router = require("./routes/index");

const app = express();
app.use(express.json());
app.use(Router);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
