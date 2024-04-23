import { Schema, model, models } from 'mongoose'


const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  iat: {
    type: Date,
    default: Date.now,
  },
  exp: {
    type: Date,
    required: true,
  },
});

const Token = models.Token || model('Token', tokenSchema);

module.exports = Token;
