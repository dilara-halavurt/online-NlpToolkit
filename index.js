"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SimpleSpellChecker_1 = require("nlptoolkit-spellchecker/dist/SimpleSpellChecker");
const FsmMorphologicalAnalyzer_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer");
const SimpleDeasciifier_1 = require("nlptoolkit-deasciifier/dist/SimpleDeasciifier");
const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
const cors = require('cors');
const app = (0, express_1.default)();
// Use Heroku's process.env.PORT or 3001 if there's nothing there.
const PORT = process.env.PORT || 3001;
const fsm = new FsmMorphologicalAnalyzer_1.FsmMorphologicalAnalyzer();
const spellChecker = new SimpleSpellChecker_1.SimpleSpellChecker(fsm);
const simpleDeasciifier = new SimpleDeasciifier_1.SimpleDeasciifier(fsm);
app.use(cors()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON bodies
// Modified to listen on process.env.PORT
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
// Example endpoint for text correction
app.post('/correct-text', (req, res) => {
    const { text } = req.body;
    const sentence = new Sentence_1.Sentence(text);
    const correctedText = spellChecker.spellCheck(sentence);
    res.json({ correctedText });
});
app.post('/morphological-analysis', (req, res) => {
    const { text } = req.body;
    let wordArray = text.split(" ");
    let analyzedText = "";
    wordArray.forEach(word => {
        analyzedText += fsm.morphologicalAnalysis(word);
    });
    res.json({ analyzedText });
});
app.post('/deasciifier', (req, res) => {
    const { text } = req.body;
    console.log(text);
    const sentence = new Sentence_1.Sentence(text);
    const asciifiedText = simpleDeasciifier.deasciify(sentence);
    res.json({ asciifiedText });
});
