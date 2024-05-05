import { Schema, model, models } from 'mongoose'

const topicSchema = new Schema({
  topic: {
    type: String,
    required: true,
    unique: true
  },
  count: {
    type: Number,
    default: 10
  },

});

const Topic = models.Topic || model('Topic', topicSchema);

export default Topic;