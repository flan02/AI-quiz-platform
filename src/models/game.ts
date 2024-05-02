import { Schema, model, models } from 'mongoose'
import { GameType } from "@/enum/index"


const gameSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  iat: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  exp: {
    type: Date,
    optional: true
  },
  topic: {
    type: String,
    required: true,
  },
  gameType: {
    type: String,
    required: true,
  },
  /*
  questions: [{
    type: Schema.Types.ObjectId,
    ref: 'Question',
  }],*/
});

const Game = models.Game || model('Game', gameSchema);

export default Game;