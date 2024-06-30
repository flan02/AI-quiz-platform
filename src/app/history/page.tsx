import History from "@/components/History";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { LucideLayoutDashboard } from "lucide-react";
import { getAuthSession } from "@/lib/nextauth"



type Props = {}

const Historypage = async (props: Props) => {
  const session = await getAuthSession()
  if (!session?.user) return redirect('/')
  return (
    <div className="h-[90vh] flex flex-col items-center justify-center mx-auto min-w-[350px] px-2 lg:px-0 md:w-[600px] lg:w-[750px]">
      <Card className="w-full border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl lg:text-4xl font-bold">History </CardTitle>
            <Link className={buttonVariants()} href="/dashboard">
              <LucideLayoutDashboard className="mr-2" />
              Back to Dashboard
            </Link>
          </div>
        </CardHeader>
        <CardContent className="max-h-[60vh] overflow-scroll overflow-x-hidden">
          <History limit={100} userId={session.user.id} />
        </CardContent>
      </Card>
      <span className="text-sm md:text-lg lg:text-xl mt-4">last 100 games</span>
    </div>
  );
}

export default Historypage