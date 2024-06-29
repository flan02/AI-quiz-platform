//'use client'  // ! It could be 'use server' by default. Pay attention to console errors

import CustomWordCloud from "../CustomWordCloud"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { getTopics } from "@/services/server"

type Topic = {
  topic: string,
  count: number
}
type Props = {}

const HotTopicsCard = async (props: Props) => {

  const topics = await getTopics() as Topic[];
  const formattedTopics = topics.map((topic: Topic) => {
    return {
      text: topic.topic,
      value: topic.count
    }
  })

  return (
    <Card className="col-span-4 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Most Requested Topics</CardTitle>
        <CardDescription>Click on a topic to create a triviathon with AI on it!</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <CustomWordCloud formattedTopics={formattedTopics} />
      </CardContent>
    </Card>
  )
}

export default HotTopicsCard