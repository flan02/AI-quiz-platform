import QuizCreation from "@/components/quiz/QuizCreation"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"


type Props = {}

export const metadata = {
  title: "Quiz page | Quiz AI",
  description: "created by Dan Chanivet",
}

const Quizpage = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')
  return <QuizCreation />

}

export default Quizpage