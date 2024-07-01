import { buttonVariants } from "@/components/ui/button";
import { getAuthSession } from "@/lib/nextauth";
import { LucideLayoutDashboard } from "lucide-react";
import Link from "next/link";

import { redirect } from "next/navigation";
import React from "react";
import ResultsCard from "@/components/statistics/ResultsCard";
import AccuracyCard from "@/components/statistics/AccuracyCard";
import TimeTakenCard from "@/components/statistics/TimeTakenCard";
import QuestionsList from "@/components/statistics/QuestionsList";
import { getGame } from "@/services/server";


type Props = {
  params: {
    gameId: string;
  };
};

const StatisticsPage = async ({ params }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) return redirect("/");
  /*
  const game = await prisma.game.findUnique({
    where: { id: gameId },
    include: { questions: true },
  });
  if (!game) {
    return redirect("/");
  }
  */
  console.log('Params received are: ', params)

  let id;
  let ultimateTime = null;
  if ((params.gameId).includes('_')) {
    id = params.gameId.split('_')[0];
    ultimateTime = params.gameId.split('_')[1];
  }

  //console.log(new Date(parseInt(ultimateTime)))

  console.log("ULTIMATE VALUE: ", ultimateTime)

  const game = await getGame(id ?? params.gameId);
  //if (!game || game.gameType !== 'mcq') return redirect('/quiz')
  //return <Mcq game={game} />

  let accuracy: number = 0;

  if (game.gameType === "mcq") {
    let totalCorrect = game.questions.reduce((acc: number, question: { isCorrect: any; }) => {
      if (question.isCorrect) {
        return acc + 1;
      }
      return acc;
    }, 0);
    accuracy = (totalCorrect / game.questions.length) * 100;
  } else if (game.gameType === "open_ended") {
    let totalPercentage = game.questions.reduce((acc: number, question: { percentajeCorrect: any }) => {
      return acc + (question.percentajeCorrect ?? 0);
    }, 0);
    accuracy = totalPercentage / game.questions.length;
  }
  accuracy = Math.round(accuracy * 100) / 100;

  return (
    <>
      <div className="p-8 mx-auto max-w-7xl lg:mb-12 min-h-[85vh]">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Summary</h2>
          <div className="flex items-center space-x-2">
            <Link href="/dashboard" className={buttonVariants()}>
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="grid gap-4 mt-4 md:grid-cols-7">
          <ResultsCard accuracy={accuracy} />
          <AccuracyCard accuracy={accuracy} />
          <TimeTakenCard
            timeEnded={ultimateTime ? new Date() : new Date(game.timeEnded)} /* HERE I NEED THE TIMEENDED VALUE FROM DATABASE */
            timeStarted={ultimateTime ? new Date(parseInt(ultimateTime)) : new Date(game.createdAt ?? 0)}
          />
        </div>
        <QuestionsList questions={game.questions} />
      </div>
    </>
  );
};

export default StatisticsPage;