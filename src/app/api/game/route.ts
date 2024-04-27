import axios from "axios";
import { getAuthSession } from "@/lib/nextauth";
import { quizSchema } from "@/schemas/form/quiz.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { type_mcqQuestion, type_openEnded } from "@/types";
import Game from "@/models/game";
import Question from "@/models/question";



export const POST = async (req: NextRequest, res: NextResponse) => {
  const session = await getAuthSession();
  console.log('User session id to mongodb query: ', session?.user.id);

  try {
    //if (!session?.user.email) return NextResponse.json({ error: 'Unauthorized. You must be logged in to create a quiz' }, { status: 401 });
    const body = await req.json();
    //const { topic, type, amount } = quizSchema.parse(body);
    const { topic, type, amount } = body;
    console.log('Values of the quiz schema: ', amount, topic, type, session?.user.id);
    const game = await Game.create({
      userId: session?.user.id,
      iat: Date.now(),
      topic,
      GameType: type

    })

    console.log('Game created: ', game);

    // * This call will generate the questions for us.
    console.log(process.env.API_URL);
    const response = await axios.post(`${process.env.API_URL}/questions`, {
      amount,
      topic,
      type
    })

    console.log(response.data);

    if (type === 'mcq') {
      let manyData = response.data.questions.map((question: type_mcqQuestion) => {
        let options = [question.choices.option1, question.choices.option2, question.choices.option3, question.choices.option4]
        options = options.sort(() => Math.random() - 0.5)
        return {
          question: question.question,
          answer: question.answer,
          options,
          gameId: game._id,
          questionType: 'mcq',
        }
      })
      await Question.insertMany(manyData)
    } else if (type === 'open_ended') {
      let manyData = response.data.questions.map((question: type_openEnded) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: game._id,
          questionType: 'open_ended',
        }
      })
      await Question.insertMany(manyData)
    }
    return NextResponse.json({ gameId: game._id }, { status: 200 })

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: 400, // ? invalid request
        error: error.issues
      });
    }
    return NextResponse.json({
      error: 'Internal server error'
    })
  }
}

/* 
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
*/