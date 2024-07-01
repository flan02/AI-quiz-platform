import Mcq from "@/components/Mcq"
import OpenEnded from "@/components/OpenEnded"
import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAuthSession } from "@/lib/nextauth"
import { getAllGames, getGame, getRandomGame } from "@/services/server"
import { History, LucideLayoutDashboard } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"


type Props = {}


/*
TODO y luego con ese _id de games lo uso para hacer otra consulta a la coleccion questions y ahi reunire todas las preguntas de ese juego en cuestion
TODO y luego con esas preguntas las muestro en la pantalla del usuario para que inicie su juego.
! Si el _id del juego elegido aleatoriamente no tiene ninguna pregunta asociada volver a repetir la repeticion hasta que obtengamos preguntas.
*/

const UltimatePage = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')

  /* 
TODO Aca lo que tengo que hacer es primero capturar de la colleccion de games un _id aleatorio en una consulta
*/
  const randomGame = await getRandomGame()
  console.log(randomGame._id);
  const game = await getGame(randomGame._id)
  if (!randomGame) return redirect('/quiz')
  if (randomGame.gameType == 'mcq') return <Mcq game={game} randomizedAt={new Date()} />
  if (randomGame.gameType !== 'mcq') return <OpenEnded game={game} randomizedAt={new Date()} />



}

export default UltimatePage