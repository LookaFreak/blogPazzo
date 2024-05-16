const Comment = require('../models/commentModel');
const HttpError = require('../models/errorModel');

async function addComment(req, res) {
    const { postId } = req.params;
    const { userId, content } = req.body;

    try {
        // Crea un nuovo commento
        const comment = new Comment({
            user: userId,
            post: postId,
            content
        });

        // Salva il commento nel database
        await comment.save();

        res.status(201).json({ message: 'Commento aggiunto con successo', comment });
    } catch (error) {
        res.status(500).json({ message: 'Errore durante l\'aggiunta del commento', error: error.message });
    }
}

module.exports = { addComment };
