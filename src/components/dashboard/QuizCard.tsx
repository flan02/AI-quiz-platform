
'use client'
import { BrainCircuit } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { useRouter } from "next/navigation"

type Props = {}

const QuizCard = (props: Props) => {
  const router = useRouter()
  return (
    <Card
      onClick={() => router.push('/quiz')}
      className="hover:cursor-pointer hover:opacity-75">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0" >
        <CardTitle className="text-2xl font-bold">Quiz AI</CardTitle>
        <BrainCircuit size={28} strokeWidth={2.5} />
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">Challenge your Brain</p>
      </CardContent>
    </Card>
  )
}

export default QuizCard