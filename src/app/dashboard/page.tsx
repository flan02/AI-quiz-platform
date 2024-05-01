import HistoryCard from "@/components/dashboard/HistoryCard"
import HotTopicsCard from "@/components/dashboard/HotTopicsCard"
import QuizCard from "@/components/dashboard/QuizCard"
import RecentActivities from "@/components/dashboard/RecentActivities"
import { getAuthSession } from "@/lib/nextauth"
import { redirect } from "next/navigation"
import React from "react";

type Props = {}

export const metadata = {
  title: 'Dashboard | Quiz AI',
  description: 'Main page created by Dan Chanivet',

}

const Dashboardpage = async (props: Props) => {
  const session = await getAuthSession()
  // console.log('Session value is: ', session);
  if (!session?.user) return redirect('/')
  return (
    <main className="p-8 mx-auto max-w-7xl ">
      <div className="flex items-center">
        <h2 className="mr-2 text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2">
        <QuizCard />
        <HistoryCard />
      </div>
      <div className="grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7">
        <HotTopicsCard />
        <RecentActivities />
      </div>
    </main>
  )
}

export default Dashboardpage