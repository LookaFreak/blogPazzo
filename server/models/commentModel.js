const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Riferimento all'utente che ha creato il commento
    post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, // Riferimento al post a cui il commento fa riferimento
    content: { type: String, required: true }, // Contenuto del commento
    createdAt: { type: Date, default: Date.now } // Data di creazione del commento
});

module.exports = model('Comment', commentSchema);
