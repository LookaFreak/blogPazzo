const {Schema, model} = require('mongoose')

const postSchema = Schema({
    title: {type: String, required: true},
    category: {type: String, enum: {values: ["Mercato", "News", "SerieB", "Video", "Primavera", "Femminile", "Altro", "SerieA"], message: "{VALUE} is not supported."}},
    description: {type: String, required: true},
    thumbnail: {type: String, required: true},
    creator: {type: Schema.Types.ObjectId, ref: 'User'},
}, {timestamps: true})

module.exports = model('Post', postSchema)