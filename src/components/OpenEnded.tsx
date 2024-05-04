'use client'
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn, formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import React from "react";
import { useToast } from "./ui/use-toast";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz.schema";
import { POST } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import BlankAnswerInput from "./BlankAnswerInput";
import Link from "next/link";

export type Question = {
  _id: string,
  question: string,
  answer: string,
  options: [string]
}

export type Game = {
  _id: string,
  topic: string,
  gameType: string,
  timeStarted: Date,
  questions: Question[]
}

type Props = {
  game: Game  // ? I should define an interface for this object.
}

const BLANKS = '_____'

const OpenEnded = ({ game }: Props) => {
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [blankAnswer, setBlankAnswer] = React.useState<string>('')
  const [hasEnded, setHasEnded] = React.useState<boolean>(false)
  const [now, setNow] = React.useState<Date>(new Date())
  const { toast } = useToast()
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex]
  }, [game.questions, questionIndex])

  const checkAnswer = async () => {
    let filledAnswer = blankAnswer
    document.querySelectorAll<HTMLInputElement>('#user-blank-input').forEach((input) => {
      filledAnswer = filledAnswer.replace(BLANKS, input.value)
      input.value = ''
    })
    const payload: z.infer<typeof checkAnswerSchema> = {
      questionId: currentQuestion._id,
      userAnswer: filledAnswer
    }
    const response = await POST('/checkAnswer', payload)
    return response
  }

  const checkAnswerMutation = useMutation({
    mutationFn: checkAnswer
  })

  const handleNext = React.useCallback(() => {
    if (checkAnswerMutation.isPending) return

    checkAnswerMutation.mutate(undefined, {
      onSuccess: ({ percentajeCorrect }) => { // ?  NextResponse.json({ percentageSimilar }, { status: 200 })
        console.log("Percentaje after mutation: ", percentajeCorrect);
        toast({
          title: `Your answer is ${percentajeCorrect}% similar to the correct answer.`,
          description: 'answers are matched based on similarity comparisons',
        });
        if (questionIndex === game.questions.length - 1) {
          setHasEnded(true)
          return
        }
        setQuestionIndex((prev) => prev + 1)
      }
    })
  }, [checkAnswerMutation, toast, questionIndex, game.questions.length])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == 'Enter') handleNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNext])

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!hasEnded) { setNow(new Date()) }
    }, 1000)
    return () => { clearInterval(interval) }
  }, [hasEnded])

  if (hasEnded) {
    return (
      <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[50vw] max-w-2xl w-[70vw] top-1/2 left-1/2">
        <div className="text-center px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You completed in {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
        </div>
        <Link href={`/statistics/${game._id}`} className={cn(buttonVariants(), 'py-5 mt-2 w-full')}>
          View Statistics
          <BarChart className="w-6 h-4 ml-2" />
        </Link>
      </div>
    )
  }
  //console.log(currentQuestion.answer);
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400 mr-2">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            {formatTimeDelta(differenceInSeconds(now, game.timeStarted))}
          </div>
        </div>

      </div>
      <Card className="w-full mt-4">
        <CardHeader className="flex flex-row items-center" >
          <CardTitle className="mr-5 text-center divide-y divide-zinc-600/50" >
            <div className="pb-1">
              {questionIndex + 1}
            </div>
            <div className="text-base text-slate-400">
              {game.questions.length}
            </div>
          </CardTitle>
          <CardDescription className="flex-grow text-lg">
            {currentQuestion.question}
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="flex flex-col items-center justify-center w-full mt-4" >
        <BlankAnswerInput answer={currentQuestion.answer} setBlankAnswer={setBlankAnswer} />
        <Button
          disabled={checkAnswerMutation.isPending}
          className="mt-6"
          onClick={() => handleNext()}
        >
          {checkAnswerMutation.isPending && <Loader2 className="m-4 h-4 mr-2 animated-spin" />}
          Next <ChevronRight className="m-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}

export default OpenEnded

{/*
  JSON.stringify(game, null, 2).split('\n').map((line, index) => (
  <p key={index}>{line}</p>
  ))
*/}