import { getAuthSession } from "@/lib/nextauth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { redirect } from "next/navigation"
import { getAllGames } from "@/services/server"
import { getTime } from "date-fns"


type Props = {};

type Game = {
  _id: string;
  topic: string;
  timeStarted: Date;
  createdAt: Date;
  timeEnded: Date;
  iat: Date;
  gameType: string;
};

const RecentActivities = async (props: Props) => {
  let limit = 11  // ? Limit the number of games to be displayed
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')

  const games = await getAllGames(session.user.id, limit)
  const orderedGames = games.sort((a: Game, b: Game) => {
    return getTime(b.createdAt ?? b.iat) - getTime(a.createdAt ?? a.iat)
  })

  //console.log(orderedGames);
  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-1 h-max">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>
          Take a look at your latest games played.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll-hidden">
        <CardDescription>
          {/* Total amount of games will come from database */}
          <p className="mb-4">last 5 games played</p>
          {orderedGames.map((game: Game, index: number) => {
            return (
              <p key={index} className="bg-slate-200 dark:bg-slate-800 mb-1 rounded-lg pl-2 min-w-[300px] hover:text-amber-400">
                {(index < 5) && game.topic + " -"}  {(index < 5) && new Date(game.createdAt ?? game.iat).toLocaleTimeString()}
              </p>
            )
          })
          }
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default RecentActivities