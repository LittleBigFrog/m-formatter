const express = require('express');
const { parse } = require('@microsoft/powerquery-parser/dist/powerquery-parser/parser');
const { DefaultSettings } = require('@microsoft/powerquery-parser/dist/powerquery-parser/common/settings');

const app = express();
app.use(express.json());

// POST endpoint to parse Power Query code and return AST
app.post('/parse', (req, res) => {
    const { expression } = req.body;

    if (!expression) {
        return res.status(400).json({ error: 'Expression is required' });
    }

    try {
        const ast = parse(DefaultSettings, expression);
        res.json({ ast });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET endpoint for health checks
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
