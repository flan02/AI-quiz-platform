import { getAuthSession } from '@/lib/nextauth'
import axios from 'axios'
import { redirect } from 'next/navigation'


type Props = {
  params: {
    gameId: string
  }
}

const McqPage = async ({ params }: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')

  try {
    console.log('Mcq Page', session);
    const games = await axios.get(`http://localhost:3000/api/game?gameId=${params.gameId}`)
    console.log('Founded Games: ', games.data)
  } catch (error) {
    console.log('Error: ', error)
  }

  return (
    <>
      <div>{params.gameId}</div>
      {/*
        games && games.data.questions.map((question: any) => (
          <div key={question.id}>
            <h1>{question.question}</h1>
            <ul>
              {question.choices.map((choice: any) => (
                <li key={choice.id}>{choice.option}</li>
              ))}
            </ul>
          </div>
        ))
      */ }
    </>
  )
}

export default McqPage