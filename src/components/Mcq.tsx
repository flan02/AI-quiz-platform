'use client'
import McqCounter from "./McqCounter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, ChevronRight, Loader2, Timer } from "lucide-react";

export type Question = {
  question: string,
  answer: string,

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
  console.log(game);
  return (
    <div className="absolute -translate-x-1/2 -translate-y-1/2 md:w-[80vw] max-w-4xl w-[90vw] top-1/2 left-1/2">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col">
          {/* topic */}
          <p>
            <span className="text-slate-400">Topic</span> &nbsp;
            <span className="px-2 py-1 text-white rounded-lg bg-slate-800">
              {game.topic}
            </span>
          </p>
          <div className="flex self-start mt-3 text-slate-400">
            <Timer className="mr-2" />
            <span>00:00</span>
          </div>
        </div>
        <McqCounter />

      </div>
      <Card className="">
        <CardHeader className="">
          <CardTitle className="">
            <div className="">{game.topic}</div>
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  )
}


export default Mcq