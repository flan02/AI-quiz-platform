import QuizCreation from "@/components/quiz/QuizCreation"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"


type Props = {
  searchParams: {
    topic?: string

  }
}

export const metadata = {
  title: "Quiz page | Quiz AI",
  description: "created by Dan Chanivet",
}

const Quizpage = async ({ searchParams }: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')
  return <QuizCreation topicParam={searchParams.topic ?? ''} />

}

export default Quizpage