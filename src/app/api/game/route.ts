import axios from "axios";
import { getAuthSession } from "@/lib/nextauth";
import { quizSchema } from "@/schemas/form/quiz.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { type_mcqQuestion, type_openEnded } from "@/types";
import Game from "@/models/game";
import Question from "@/models/question";
import { connectDB } from "@/lib/mongodb";

export async function POST(req: NextRequest, res: NextResponse) {

  // ! Fix the session issue. I can't retrieve the user session id
  // TODO Take a look into req cookies as well.
  //const session = getAuthSession();
  //console.log('User session id to mongodb query: ', session);

  try {
    //if (!session?.user.email) return NextResponse.json({ error: 'Unauthorized. You must be logged in to create a quiz' }, { status: 401 });
    const body = await req.json();
    //const { topic, type, amount } = quizSchema.parse(body);
    const { topic, type, amount } = body;
    //console.log('Values of the quiz schema: ', amount, topic, type, session);
    await connectDB()
    const game = {
      userId: '662840e80835770264eb9e02',
      topic,
      gameType: type,
    }

    const newGame = await Game.create(game)

    // console.log('Game created: ', newGame);
    // return NextResponse.json({ message: 'Quiz created successfully', newGame: newGame }, { status: 200 });

    // * This call will generate the questions for us.
    //console.log(process.env.API_URL);
    const response = await axios.post(`${process.env.API_URL}/questions`, {
      amount,
      topic,
      type
    })

    console.log(response.data);

    if (type === 'mcq') {
      let questionData = response.data.questions.map((question: type_mcqQuestion) => {
        let options = [question.choices.option1, question.choices.option2, question.choices.option3, question.choices.option4]
        options = options.sort(() => Math.random() - 0.5)
        return {
          question: question.question,
          answer: question.answer,
          options,
          gameId: newGame._id,
          questionType: 'mcq',
        }
      })
      questionData.options = JSON.stringify(questionData.options)

      await Question.create(questionData)
    } else if (type === 'open_ended') {
      let questionData = response.data.questions.map((question: type_openEnded) => {
        return {
          question: question.question,
          answer: question.answer,
          gameId: newGame._id,
          questionType: 'open_ended',
        }
      })
      //questionData.options = JSON.stringify(questionData.options)
      console.log('Question data: ', questionData);
      await Question.create(questionData)
    }
    return NextResponse.json({ gameId: newGame._id }, { status: 200 })

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
 } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: 400, // ? invalid request
        error: error.issues
      });
    } else {
      return NextResponse.json({
        error: 'Internal server error from nextjs api route',
        message: (error as any).message
      })
    }
  }
  */
