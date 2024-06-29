import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


type Props = {}

const RandomGame = (props: Props) => {
  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-1 h-max">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Ultimate triviathon challenge</CardTitle>
        <CardDescription>
          Prove yourself against AI with randow trivia from our questions database.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll-hidden">
        Histories
      </CardContent>
    </Card>
  )
}

export default RandomGame