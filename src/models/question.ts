import { Schema, model, models } from 'mongoose'


const questionSchema = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  gameId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Game',
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  topic: {
    type: String,
    required: true,
  },
  options: { // for mcq questions
    type: Schema.Types.Mixed,
    optional: true,
  },
  isCorrect: { // for mcq questions
    type: Boolean,
    optional: true
  },
  percentajeCorrect: { // for open_ended questions
    type: Number,
    required: true,
  },
  questionType: {
    type: GameType,
    required: true
  },
  userAnswer: {
    type: String,
    optional: true
  }
});

const Question = models.Question || model('Question', questionSchema);

module.exports = Question;