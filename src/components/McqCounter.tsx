import { CheckCircle2, XCircle } from "lucide-react"
import { Card } from "./ui/card"
import { Separator } from "./ui/separator"


type Props = {
  correctAnswers: number,
  wrongAnswers: number
}

const McqCounter = ({ correctAnswers, wrongAnswers }: Props) => {
  console.log("correct: ", correctAnswers)
  console.log("wrong: ", wrongAnswers)
  return (
    <Card className="flex items-center justify-center p-1">
      <CheckCircle2 color='green' size={30} />
      <span className="mx-2 text-2xl text-emerald-600">
        {correctAnswers}
      </span>
      <Separator orientation="vertical" />
      <span className="mx-3 text-2xl text-rose-600">
        {wrongAnswers}
      </span>
      <XCircle color='red' size={30} />
    </Card>
  )
}

export default McqCounter