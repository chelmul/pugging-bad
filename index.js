import express from "express";
import axios from "axios";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

const API_URL = "https://api.breakingbadquotes.xyz/v1/quotes";
var pugSounds = ["*snort*", "*grunt*", "*cough*", "(side eye)", "*sigh*", "(head tilt)", "(scratches ear loudly)", "(long slow snore)", "woof!", "*yawn*", "(emits hacking cough)", "(flaps ears)", "(barks at doorbell)", "*sharp exhale*"];

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    const content = {
        bbQuote: "Awaiting a random quote...",
        bbAuthor: " ",
        pugQuote: "*Snort*...",
    };
    res.render("index.ejs", content);
  });

  app.get("/submit", async (req, res) => {
    try {
    var randomPugSound = pugSounds[Math.floor(Math.random()*pugSounds.length)];
    var randomPugSound2 = pugSounds[Math.floor(Math.random()*pugSounds.length)];
    var randomPugSound3 = pugSounds[Math.floor(Math.random()*pugSounds.length)];

      const result = await axios.get(API_URL);
      const quoteData = result.data[0];

      const pugDictionary = {
        ", ": `, ${randomPugSound2} `,
        "have": "has",
        " man ": " pug ",
        " woman ": " pug ",
        "man.": "pug.",
        "!": "woof!",
        " meth": " treats",
        "kid": "pup",
        "cook": "boop",
        "life": "snoot"
          };

      var pugifiedQuote = quoteData.quote;
      Object.keys(pugDictionary).forEach((key) => {
        pugifiedQuote = pugifiedQuote.replaceAll(key, pugDictionary[key]);
      });
      

      const content = {
        bbQuote: quoteData.quote,
        bbAuthor: quoteData.author,
        pugQuote: randomPugSound + " " + pugifiedQuote + " " + randomPugSound3,
      }
      res.render("index.ejs", content);
    } catch (error) {
        console.log(error.response);
        res.status(500);
    }});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
