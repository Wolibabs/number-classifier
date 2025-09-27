const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const classifyRoutes = require("./routes/classify.routes");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Number Classifier API"});
});

app.use("/api", classifyRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>{

 console.log(`Server running on port ${PORT}`);
});
