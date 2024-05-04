'use client'
import { useForm } from "react-hook-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { quizSchema } from "@/schemas/form/quiz.schema"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { BookOpen, CopyCheck } from "lucide-react"
import { Separator } from "../ui/separator"
import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { POST } from "@/services/axios"
import React from "react"
import LoadingQuestions from "../LoadingQuestions"


type Props = {}

type Input = z.infer<typeof quizSchema>

const QuizCreation = (props: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [finished, setFinished] = React.useState<boolean>(false)
  const form = useForm<Input>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      topic: '',
      type: 'open_ended',
      amount: 5
    }
  })

  const setGame = async ({ amount, topic, type }: Input) => {
    const data = { amount, topic, type }
    return POST('/game', data)
  }

  const mutationQuiz = useMutation({
    mutationFn: setGame
  })



  const onSubmit = (input: Input) => {
    setIsLoading(true)
    mutationQuiz.mutate({
      amount: input.amount,
      topic: input.topic,
      type: input.type
    }, {
      onSuccess: ({ gameId }) => {
        setFinished(true)
        setTimeout(() => {
          if (form.getValues('type') === 'open_ended') router.push(`/play/open-ended/${gameId}`)
          if (form.getValues('type') === 'mcq') router.push(`/play/mcq/${gameId}`)
        }, 1000)
      },
      onError: (error: any) => {
        console.log('Mutation Game error: ', error)
        setIsLoading(false)
      }
    })
  }

  form.watch() // * re-render the component when the form values change

  if (isLoading) return <LoadingQuestions finished={finished} />

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <Card>
        <CardHeader>
          <CardTitle className="font-bold text-2xl">Quiz Creation</CardTitle>
          <CardDescription>Choose a topic</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="topic"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Topic</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a topic..." {...field} />
                    </FormControl>
                    <FormDescription>
                      Please provide a topic.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of questions</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter an amount..." {...field} type="number" min={1} max={10}
                        onChange={e => {
                          form.setValue('amount', parseInt(e.target.value))
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-between">
                <Button
                  type="button"
                  onClick={() => form.setValue('type', 'mcq')}
                  variant={form.getValues('type') === 'mcq' ? 'default' : 'secondary'}
                  className="w-1/2 rounded-none rounded-l-lg">
                  <CopyCheck className="h-4 w-16 mr-2" /> Multiple Choice
                </Button>
                <Separator orientation="vertical" />
                <Button
                  type="button"
                  onClick={() => form.setValue('type', 'open_ended')}
                  variant={form.getValues('type') === 'open_ended' ? 'default' : 'secondary'}
                  className="w-1/2 rounded-none rounded-r-lg">
                  <BookOpen className="h-4 w-4 mr-2" /> Open Ended
                </Button>
              </div>
              <Button
                disabled={mutationQuiz.isPending ? true : false} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 hover:text-white">Submit</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}

export default QuizCreation