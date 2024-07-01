'use client'
import McqCounter from "./McqCounter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React from "react";
import { Button, buttonVariants } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz.schema";
import { POST } from "@/services/axios";
import { useToast } from "./ui/use-toast";
import Link from "next/link";
import { cn, formatTimeDelta } from "@/lib/utils";
import { differenceInSeconds } from "date-fns";


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
  timeEnded: Date,
  createdAt: Date,
  questions: Question[]
}

type Props = {
  game: Game  // ? I should define an interface for this object.
  randomizedAt?: Date
}

const Mcq = ({ game, randomizedAt }: Props) => {
  //console.log(game);
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = React.useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = React.useState<number>(0)
  const [hasEnded, setHasEnded] = React.useState<boolean>(false)
  const [now, setNow] = React.useState<Date>(new Date())

  const { toast } = useToast()
  const currentQuestion = React.useMemo(() => {
    return game.questions[questionIndex]
  }, [game.questions, questionIndex])
  /*
    const opts = React.useMemo(() => {
      if (!currentQuestion || !currentQuestion.options) return []
      return JSON.parse(currentQuestion.options) // as string) as string[]
    }, [currentQuestion])
  */
  const checkAnswer = async () => {
    const payload: z.infer<typeof checkAnswerSchema> = {
      questionId: currentQuestion._id,
      userAnswer: currentQuestion.options[selectedChoice]
    }
    const response = await POST('/checkAnswer', payload)
    return response
  }

  const gameEnded = async (timeEnded: Date) => {
    const response = await POST('/gameEnded', {
      gameId: game._id,
      timeEnded
    })
    return response
  }

  const checkAnswerMutation = useMutation({
    mutationFn: checkAnswer
  })

  const gameEndedMutation = useMutation({
    mutationFn: gameEnded
  })

  const handleNext = React.useCallback(() => {
    if (checkAnswerMutation.isPending) return
    checkAnswerMutation.mutate(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: 'Correct!',
            description: 'Correct Answer',
            variant: 'success'
          })
          // setCorrectAnswers(questionIndex + 1) // * This way works only with the current state. Will sum 1 to the current state.
          setCorrectAnswers((prev) => prev + 1) // * This way only works with the previous state. Will sum 1 to the previous state.
        }
        else {
          toast({
            title: 'Wrong!',
            description: 'Wrong Answer',
            variant: 'destructive'
          })
          setWrongAnswers((prev) => prev + 1)
        }
        if (questionIndex === game.questions.length - 1) {
          game.timeEnded = now
          gameEndedMutation.mutate(game.timeEnded)
          setHasEnded(true)
          return;
        }
        setQuestionIndex((prev) => prev + 1)
      }
    })
  }, [checkAnswerMutation, questionIndex, game, toast, now, gameEndedMutation])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == '1') {
        setSelectedChoice(0)
      } else if (e.key == '2') {
        setSelectedChoice(1)
      } else if (e.key == '3') {
        setSelectedChoice(2)
      } else if (e.key == '4') {
        setSelectedChoice(3)
      } else if (e.key == 'Enter') {
        handleNext()
      }
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
    return () => {
      clearInterval(interval)
    }
  }, [hasEnded])

  if (hasEnded) {

    return (
      <div className="h-[90vh] flex flex-col items-center justify-center lg:w-full md:w-[50vw] max-w-2xl w-[70vw] mx-auto">
        <h1 className="text-xl">TriviaAI ended 🎀</h1>
        <div className="min-w-[350px] text-center px-4 py-2 mt-2 font-semibold text-white bg-green-500 rounded-md whitespace-nowrap">
          You completed in {formatTimeDelta(differenceInSeconds(now, randomizedAt ?? game.createdAt))}
        </div>

        <Link href={`/statistics/${game._id}${randomizedAt ? "_" + now.getTime() : ""}`} className={cn(buttonVariants(), 'py-5 mt-2 min-w-[350px]')}>
          View Statistics
          <BarChart className="w-6 h-4 ml-2" />
        </Link>
      </div>
    )
  }



  return (
    <div className="flex flex-col items-center justify-start h-[80vh] w-[90vw] md:w-[80vw] lg:max-w-7xl mx-auto pt-8 mt-[10vh]">
      <div className="flex flex-row justify-between w-full mb-4">
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
            {formatTimeDelta(differenceInSeconds(now, randomizedAt ?? game.createdAt))}
          </div>
        </div>
        <McqCounter correctAnswers={correctAnswers} wrongAnswers={wrongAnswers} />
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
        {
          currentQuestion.options.map((option, index) => {
            return (
              <Button
                variant={selectedChoice === index ? 'default' : 'secondary'}
                onClick={() => setSelectedChoice(index)}
                key={index} className="justify-start w-full py-8 mb-4">
                <div className="flex items-center justify-start">
                  <div className="p-2 px-3 mr-5 border rounded-md">
                    {index + 1}
                  </div>
                  <div className="text-start">{option}</div>
                </div>
              </Button>
            )
          })
        }
        <Button
          disabled={checkAnswerMutation.isPending}
          className="mt-2"
          onClick={() => handleNext()}
        >
          {checkAnswerMutation.isPending && <Loader2 className="m-4 h-4 mr-2 animated-spin" />}
          Next <ChevronRight className="m-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}


export default Mcq