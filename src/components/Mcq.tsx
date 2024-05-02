
'use client'
import McqCounter from "./McqCounter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { checkAnswerSchema } from "@/schemas/form/quiz.schema";
import { POST } from "@/services/axios";
import { useToast } from "./ui/use-toast";

export type Question = {
  _id: string,
  question: string,
  answer: string,
  options: [string]
}

export type Game = {
  topic: string,
  gameType: string,
  questions: Question[]
}

type Props = {
  game: Game  // ? I should define an interface for this object.
}

const Mcq = ({ game }: Props) => {
  //console.log(game);
  const [questionIndex, setQuestionIndex] = React.useState<number>(0)
  const [selectedChoice, setSelectedChoice] = React.useState<number>(0)
  const [correctAnswers, setCorrectAnswers] = React.useState<number>(0)
  const [wrongAnswers, setWrongAnswers] = React.useState<number>(0)
  const [hasEnded, setHasEnded] = React.useState<boolean>(false)
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

  const checkAnswerMutation = useMutation({
    mutationFn: checkAnswer
  })

  const handleNext = React.useCallback(() => {
    checkAnswerMutation.mutate(undefined, {
      onSuccess: ({ isCorrect }) => {
        if (isCorrect) {
          toast({
            title: 'Correct!',
            variant: 'success'
          })
          setCorrectAnswers(questionIndex + 1) // ? Two different ways to update the state.
        }
        else {
          toast({
            title: 'Wrong!',
            variant: 'destructive'
          })
          setWrongAnswers((prev) => prev + 1) // ? Two different ways to update the state.
        }
        if (questionIndex === game.questions.length - 1) setHasEnded(true)
        setQuestionIndex((prev) => prev + 1)
      }
    })
  }, [checkAnswerMutation, questionIndex, game.questions.length, toast])

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key == '1') {
        setSelectedChoice(0)
      } else if (e.key == '2') {
        setSelectedChoice(1)
      } else if (e.key == '3') {
        setSelectedChoice(1)
      } else if (e.key == '4') {
        setSelectedChoice(1)
      } else if (e.key == 'Enter') {
        handleNext()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleNext])

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
            <span>00:00</span>
          </div>
        </div>
        <McqCounter correctAnswers={0} wrongAnswers={0} />
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
          onClick={() => questionIndex < game.questions.length - 1 ? setQuestionIndex(questionIndex + 1) : <p>There was an error.</p>}
        >
          {checkAnswerMutation.isPending && <Loader2 className="m-4 h-4 mr-2 animated-spin" />}
          Next <ChevronRight className="m-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}


export default Mcq