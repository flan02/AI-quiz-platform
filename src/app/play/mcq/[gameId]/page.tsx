import Mcq from '@/components/Mcq'
import { getAuthSession } from '@/lib/nextauth'

import { getGame } from '@/services/server'
import { redirect } from 'next/navigation'


type Props = {
  params: {
    gameId: string
  }
}

const McqPage = async ({ params }: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')

  // $ SERVER COMPONENT .... I DONT NEED CREATE AN API TO CONSUME DATA, I CAN USE THE NEXTJS SERVER COMPONENT TO FETCH DATA DIRECTLY FROM THE SERVER
  // * I WILL BE ABLE TO CALL DATABASE QUERIES DIRECTLY FROM THE SERVER COMPONENT (BEST PRACTICE CREATE A FUNCTION IN OTHER DIRECTORY AND IMPORT IT HERE)

  //console.log(params.gameId);
  const game = await getGame(params.gameId)

  if (!game || game.gameType !== 'mcq') return redirect('/quiz')
  return <Mcq game={game} />

}

export default McqPage

// TODO Gist to verify the data from the database.
{/*
  JSON.stringify(game, null, 2).split('\n').map((line, index) => (
  <p key={index}>{line}</p>
  ))
*/}