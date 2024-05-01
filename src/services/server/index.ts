import { connectDB } from "@/lib/mongodb";
import Game from "@/models/game";
import Question from "@/models/question";


export async function getGame(gameId: string) {
  try {
    connectDB()
    const game = await Game.findById(gameId).populate('questions')
    const questions = await Question.find({ gameId }, { "gameId": 0 })
    if (!questions) return null
    game.questions = questions
    return game
  } catch (error) {
    console.log(error)
    return error
  }

}