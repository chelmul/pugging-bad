import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
const API_URL = "https://api.breakingbadquotes.xyz/v1/quotes";

  app.get("/", async (req, res) => {
    try {
      const result = await axios.get(API_URL);
      res.render("index.ejs", { 
        content: JSON.stringify(result.data) 
    });

    } catch (error) {
        console.log(error.response);
        res.status(500);
    }
      });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });