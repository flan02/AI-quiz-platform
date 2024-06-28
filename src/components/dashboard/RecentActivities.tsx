import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"


type Props = {}

const RecentActivities = (props: Props) => {
  return (
    <Card className="col-span-4 lg:col-span-1">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recent Activities</CardTitle>
        <CardDescription>
          {/* Total amount of games will come from database */}
          You have player a total of 7 games.
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[580px] overflow-scroll-hidden">
        Histories
      </CardContent>
    </Card>
  )
}

export default RecentActivities