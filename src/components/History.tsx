
import { Clock, CopyCheck, Edit2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import McqCounter from "./McqCounter";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";
import { getAllGames, getGame } from "@/services/server";
import { getTime } from "date-fns";

type Props = {
  limit: number;
  userId: string;
};

type Game = {
  _id: string;
  topic: string;
  timeStarted: Date;
  createdAt: Date;
  iat: Date;
  gameType: string;
};

const HistoryComponent = async ({ limit, userId }: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')

  const games = await getAllGames(session.user.id, limit)
  const orderedGames = games.sort((a: Game, b: Game) => {
    return getTime(b.createdAt ?? b.iat) - getTime(a.createdAt ?? a.iat)
  })

  return (
    <div className="space-y-8">
      {
        orderedGames.map((game: Game, index: number) => {
          return (
            <div className="flex items-center justify-between" key={index}>
              <div className="flex items-center">
                {game.gameType === "mcq" ? (
                  <CopyCheck className="mr-3" />
                ) : (
                  <Edit2 className="mr-3" />
                )}
                <div className="ml-4 space-y-1">
                  <Link
                    className="text-base font-medium leading-none underline"
                    href={`/statistics/${game._id}`}
                  >
                    {game.topic}
                  </Link>
                  <p className="flex items-center px-2 py-1 text-xs text-white rounded-lg w-fit bg-slate-800">
                    <Clock className="w-4 h-4 mr-1" />
                    {new Date(game.createdAt ?? game.iat).toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {game.gameType === "mcq" ? "Multiple Choice" : "Open-Ended"}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

    </div>
  );
};

export default HistoryComponent;