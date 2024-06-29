import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


type Props = {}

const RandomGame = (props: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-1 h-max">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Fast TriviaAI Challenge</CardTitle>
        <CardDescription>
          Try a random previous triviathon game already played.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll-hidden">
        Histories
      </CardContent>
    </Card>
  )
}

export default RandomGame