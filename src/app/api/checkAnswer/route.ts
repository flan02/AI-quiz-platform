import Question from "@/models/question";
import { checkAnswerSchema } from "@/schemas/form/quiz.schema";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import stringSimilarity from "string-similarity";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json()
    const { questionId, userAnswer } = checkAnswerSchema.parse(body)
    const question = await Question.findById(questionId)
    if (!question) return NextResponse.json({ error: 'Question not found' }, { status: 404 })
    await Question.findByIdAndUpdate(questionId, { userAnswer })

    if (question.questionType === 'mcq') {
      const isCorrect = question.answer.toLowerCase().trim() === userAnswer.toLowerCase().trim()
      await Question.findByIdAndUpdate(questionId, { isCorrect })
      return NextResponse.json({ isCorrect }, { status: 200 })
    }
    if (question.questionType === 'open_ended') {
      let percentageSimilar = stringSimilarity.compareTwoStrings(question.answer.toLowerCase().trim(), userAnswer.toLowerCase().trim())
      percentageSimilar = Math.round(percentageSimilar * 100)
      console.log("Percentaje similar compared in Server: ", percentageSimilar);
      await Question.findByIdAndUpdate(questionId, { percentajeCorrect: percentageSimilar })
      return NextResponse.json({ percentajeCorrect: percentageSimilar }, { status: 200 })
    }

  } catch (error) {
    if (error instanceof ZodError) {
      //console.error(error.message)
      return NextResponse.json({ error: error.issues }, { status: 400 })
    }
  }

}