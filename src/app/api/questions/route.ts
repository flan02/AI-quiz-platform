import { NextRequest, NextResponse } from "next/server";
import { quizSchema } from "@/schemas/form/quiz.schema";
import { ZodError } from "zod";
import { strict_output } from "@/lib/gpt";
import { getAuthSession } from "@/lib/nextauth";
import { getServerSession } from 'next-auth'

// TODO: POSTMAN 
// * http://localhost:3000/api/questions
export const POST = async (req: Request, res: Response) => {
  try {
    //const session = await getAuthSession();
    //if (!session?.user.email) return NextResponse.json({ error: 'Unauthorized. You must be logged in to create a quiz' }, { status: 401 });
    const body = await req.json();
    const { amount, topic, type } = quizSchema.parse(body);
    let questions
    if (type === 'open_ended') {
      questions = await strict_output('You are a helpful AI that is able to generate a pair of questions and answers, the length of the answer should not exceed 15 words store all the pairs of answers and questions in a JSON array',
        new Array(amount).fill(`You are to generate a random hard open-ended question about ${topic}`),
        {
          question: "question",
          answer: 'answer with max length of 15 words'
        }
      );
    } else if (type === 'mcq') {
      questions = await strict_output('You are a helpful AI that is able to generate mcq questions and answers, the length of each answer should not exceed 15 words ',
        new Array(amount).fill(`You are to generate a random mcq question about ${topic}`),
        {
          question: "question",
          answer: 'answer with max length of 15 words',
          choices: {
            option1: "1st option with max length of 15 words",
            option2: "2nd option with max length of 15 words",
            option3: "3rd option with max length of 15 words",
            option4: "4th option with max length of 15 words",
          }
        }
      );
    }
    return NextResponse.json({ questions }, { status: 200 });
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({
        status: 400, // ? invalid request
        error: error.issues
      });
    }
  }
}