import { getAuthSession } from "@/lib/nextauth";
import { quizSchema } from "@/schemas/form/quiz.schema";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import Game from "@/models/game";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const session = await getAuthSession();
    if (!session?.user.email) return NextResponse.json({ error: 'Unauthorized. You must be logged in to create a quiz' }, { status: 401 });
    const body = await req.json();
    const { amount, topic, type } = quizSchema.parse(body);
    const game = await Game.create({
      userId: session.user.id,
      iat: Date.now(),
      topic,
      GameType: type

    })

    // * This call will generate the questions for us.
    const response = await axios.post(`${process.env.API_URL}/questions`, {
      amount,
      topic,
      type
    })

    if (type === 'mcq') {
      game.questions = response.data.questions.map((question: any) => {
        return {
          question: question.question,
          answer: question.answer,
          choices: question.choices
        }
      })
    } else if (type === 'open_ended') {
      game.questions = response.data.questions.map((question: any) => {
        return {
          question: question.question,
          answer: question.answer
        }
      })
    }

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