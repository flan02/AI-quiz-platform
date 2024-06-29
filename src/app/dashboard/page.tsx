import HistoryCard from "@/components/dashboard/HistoryCard"
import HotTopicsCard from "@/components/dashboard/HotTopicsCard"
import QuizCard from "@/components/dashboard/QuizCard"
import RandomGame from "@/components/dashboard/RandomGame"
import RecentActivities from "@/components/dashboard/RecentActivities"
import DetailsDialog from "@/components/DetailsDialog"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react";

type Props = {}

export const metadata = {
  title: 'Dashboard | Triviathon',
  description: 'An open-source platform developed with help of OpenAI API developed by Dan Chanivet',

}

const Dashboardpage = async (props: Props) => {
  const session = await getAuthSession()
  // console.log('Session value is: ', session);
  if (!session?.user) return redirect('/')
  return (
    <main>
      <div className="px-1 py-8 mx-auto max-w-7xl lg:h-[90vh]">
        <div className="flex items-center">
          <h2 className="mr-4 text-3xl font-bold tracking-tight">Dashboard</h2>
          <DetailsDialog />
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <QuizCard />
          <HistoryCard />
        </div>
        <div className="grid gap-4 mt-4 md:grid-cols-2">
          <HotTopicsCard />
          <div>
            <RandomGame />
            <RecentActivities />
          </div>
        </div>
      </div>
    </main>
  )
}

export default Dashboardpage