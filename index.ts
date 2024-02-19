import express from 'express';
import {SimpleSpellChecker} from "nlptoolkit-spellchecker/dist/SimpleSpellChecker";
import { FsmMorphologicalAnalyzer } from 'nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer';
import { Sentence } from 'nlptoolkit-corpus/dist/Sentence'
const cors = require('cors');
const app = express();

const PORT = 3001;
const fsm = new FsmMorphologicalAnalyzer();
const spellChecker = new SimpleSpellChecker(fsm);   


app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
// Example endpoint for text correction
app.post('/correct-text', (req, res) => {
  const { text } = req.body;
  // Implement your correction logic here
  const sentence = new Sentence(text);
  const correctedText = spellChecker.spellCheck(sentence);
  res.json({ correctedText });
});
