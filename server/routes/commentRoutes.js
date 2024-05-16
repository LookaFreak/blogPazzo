const express = require('express');
const { addComment } = require('../controllers/commentControllers');
const router = express.Router();

// Rotta per aggiungere un commento
router.post('/posts/:postId/comments', async (req, res) => {
    const { postId } = req.params;
    const { userId, commentText } = req.body; // Assicurati che questi dati siano inviati nel corpo della richiesta

    try {
        await addComment(postId, userId, commentText);
        res.status(200).send('Commento aggiunto con successo');
    } catch (error) {
        res.status(500).send('Errore durante l\'aggiunta del commento');
    }
});

module.exports = router;
