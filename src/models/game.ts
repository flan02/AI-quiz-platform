import { Schema, model, models } from 'mongoose'



const gameSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  iat: {
    type: Date,
    default: Date.now,
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
    type: GameType,
    required: true,
  },
});

const Game = models.Game || model('Game', gameSchema);

export default Game;