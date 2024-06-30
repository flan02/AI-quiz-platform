import { getAuthSession } from "@/lib/nextauth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { redirect } from "next/navigation"
import { getAllGames } from "@/services/server"
import { getTime } from "date-fns"
import { Rewind } from "lucide-react"


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
  let limit = 1000  // ? Limit the number of games to be displayed
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')

  const games = await getAllGames(session.user.id, limit)
  const orderedGames = games.sort((a: Game, b: Game) => {
    return getTime(b.createdAt ?? b.iat) - getTime(a.createdAt ?? a.iat)
  })


  return (
    <Card className="hover:cursor-pointer hover:opacity-75">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <Rewind size={28} strokeWidth={2.5} />

      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll-hidden">
        <CardDescription className="mb-4">
          You have played a total of {games.length} games. Take a look at your latest games played.
        </CardDescription>
        <CardDescription>
          {/* Total amount of games will come from database */}

          {orderedGames.map((game: Game, index: number) => {
            return (
              <section key={index} className="mb-1 rounded-lg min-w-[300px] hover:text-slate-900 hover:dark:text-slate-500 hover:underline hover:dark:underline">
                <p>{(index < 5) && "Topic: " + game.topic}</p>

                <p>{(index < 5) && "played at: " + new Date(game.createdAt ?? game.iat).toLocaleTimeString()}</p>
              </section>
            )
          })
          }
        </CardDescription>
      </CardContent>
    </Card>
  )
}

export default RecentActivities