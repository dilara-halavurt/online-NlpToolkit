"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SimpleSpellChecker_1 = require("nlptoolkit-spellchecker/dist/SimpleSpellChecker");
const FsmMorphologicalAnalyzer_1 = require("nlptoolkit-morphologicalanalysis/dist/MorphologicalAnalysis/FsmMorphologicalAnalyzer");
const Sentence_1 = require("nlptoolkit-corpus/dist/Sentence");
const cors = require('cors');
const app = (0, express_1.default)();
const PORT = 3001;
const fsm = new FsmMorphologicalAnalyzer_1.FsmMorphologicalAnalyzer();
const spellChecker = new SimpleSpellChecker_1.SimpleSpellChecker(fsm);
app.use(cors()); // Enable CORS
app.use(express_1.default.json()); // Parse JSON bodies
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
// Example endpoint for text correction
app.post('/correct-text', (req, res) => {
    const { text } = req.body;
    // Implement your correction logic here
    const sentence = new Sentence_1.Sentence(text);
    const correctedText = spellChecker.spellCheck(sentence);
    res.json({ correctedText });
});
