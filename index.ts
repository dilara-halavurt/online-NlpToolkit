import express from 'express';
import {SimpleSpellChecker} from "nlptoolkit-spellchecker/dist/SimpleSpellChecker";
import { FsmMorphologicalAnalyzer } from 'nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer';
import { SimpleDeasciifier } from 'nlptoolkit-deasciifier/dist/SimpleDeasciifier'
import { Sentence } from 'nlptoolkit-corpus/dist/Sentence';
const cors = require('cors');
const app = express();

// Use Heroku's process.env.PORT or 3001 if there's nothing there.
const PORT = process.env.PORT || 3001;
const fsm = new FsmMorphologicalAnalyzer();
const spellChecker = new SimpleSpellChecker(fsm);
const simpleDeasciifier = new SimpleDeasciifier(fsm)


app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Modified to listen on process.env.PORT
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Example endpoint for text correction
app.post('/correct-text', (req, res) => {
  const { text } = req.body;
  const sentence = new Sentence(text);
  const correctedText = spellChecker.spellCheck(sentence);
  res.json({ correctedText });
});

app.post('/morphological-analysis', (req, res) =>{
  const { text } = req.body;
    let wordArray: string[] = text.split(" ");
    let analyzedText = ""
    wordArray.forEach(word => {
      analyzedText += fsm.morphologicalAnalysis(word);
    });
    res.json({ analyzedText })
});

app.post('/deasciifier', (req, res) =>{
  const { text } = req.body;
  console.log(text)
  const sentence = new Sentence(text);
  const asciifiedText = simpleDeasciifier.deasciify(sentence)
  res.json({ asciifiedText });
});
