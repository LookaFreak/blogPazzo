import React, { useState } from 'react';
import PropTypes from 'prop-types';

function CommentForm({ postId, userId, onCommentSubmit }) {
    const [comment, setComment] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(`http://localhost:5000/api/posts/${postId}/comments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId,
                    content: comment
                })
            });

            if (!response.ok) {
                throw new Error('Errore durante l\'aggiunta del commento');
            }

            const data = await response.json();
            onCommentSubmit(data.comment); // Chiamata alla funzione fornita dalla prop per gestire il commento aggiunto
            setComment(''); // Pulisce il campo del commento dopo l'invio
        } catch (error) {
            console.error('Errore:', error.message);
            // Gestisci l'errore in base alle tue esigenze
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="comment">Commento:</label><br />
            <textarea id="comment" value={comment} onChange={(e) => setComment(e.target.value)} rows="4" cols="50" required></textarea><br /><br />
            <button type="submit">Invia</button>
        </form>
    );
}

CommentForm.propTypes = {
    postId: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    onCommentSubmit: PropTypes.func.isRequired
};

export default CommentForm;
