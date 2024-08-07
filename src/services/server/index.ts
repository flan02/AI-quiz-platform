import { connectDB } from "@/lib/mongodb";
import Game from "@/models/game";
import Question from "@/models/question";
import Topic from "@/models/topic";



export async function getGame(gameId: string) {
  try {
    connectDB()
    const game = await Game.findById(gameId).populate('questions')
    const questions = await Question.find({ gameId }, { gameId: 0 })
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

export async function getRandomGame() {
  try {
    connectDB()
    const totalGames = await Game.countDocuments()
    const randomGame = await Game.findOne().skip(Math.floor(Math.random() * totalGames))

    const randomGameParsed = JSON.parse(JSON.stringify(randomGame))
    return randomGameParsed

  } catch (error) {
    console.log(error)
    return error
  }
}

export async function getTopics() {
  try {
    connectDB()
    const topics = await Topic.find({}, { _id: 0 })
    //console.log('Topics: ', topics)
    const topicsParsed = JSON.parse(JSON.stringify(topics))
    return topicsParsed
    // return topics
  } catch (error) {
    console.log(error);
    return error
  }
}