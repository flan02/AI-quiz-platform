'use client'
import { Swords } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { useRouter } from "next/navigation"


type Props = {}

const UltimateChallenge = (props: Props) => {
  const router = useRouter()
  return (
    <Card
      onClick={() => router.push('/ultimate')}
      className="hover:cursor-pointer hover:opacity-75">
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-2xl font-bold">Ultimate triviathon challenge</CardTitle>
        <Swords size={28} strokeWidth={2.5} />

      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground"> Prove your knowledge with a quick game already created with AI from random users</p>
      </CardContent>
    </Card>
  )
}

export default UltimateChallenge