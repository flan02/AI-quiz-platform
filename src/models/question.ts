import { GameType } from '@/enum/index';
import { Schema, model, models } from 'mongoose'


const questionSchema = new Schema({
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
  questionType: {
    type: String,
    required: true
  },
  options: { // for mcq questions
    type: Schema.Types.Mixed, // JSON format
    default: {},
    required: false,
  },
  isCorrect: { // for mcq questions
    type: Boolean,
    optional: true
  },
  percentajeCorrect: { // for open_ended questions
    type: Number,
    optional: true,
  },
  userAnswer: {
    type: String,
    optional: true
  }
});

const Question = models.Question || model('Question', questionSchema);

export default Question;

/* 
options:
// type: Schema.Types.Mixed, // JSON format
    // default: {},
*/