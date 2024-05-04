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
    const gameParsed = JSON.parse(JSON.stringify(game))
    return gameParsed
  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getAllGames(userId: string, limit: number = 10) {
  try {
    connectDB()
    const games = await Game.find({ userId }).limit(limit).sort({ timeStarted: -1 })
    const gamesParsed = JSON.parse(JSON.stringify(games))
    return gamesParsed
  } catch (error) {
    console.log(error)
    return error
  }
}