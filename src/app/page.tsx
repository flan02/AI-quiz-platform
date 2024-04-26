import SignInButton from "@/components/SignInButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";




export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) return redirect('dashboard')

  return (
    <main>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Card className="w-[400px]">
          <CardHeader>
            <CardTitle>Welcome to Quiz AI</CardTitle>
            <CardDescription>
              Quiz AI is a quiz application that uses AI to generate questions and answers.
              It is a work in progress and is being developed by:

            </CardDescription>
            <a className="text-blue-700 underline" href="https://www.chanivetdan.tech" target="_blank"> author website </a>
          </CardHeader>
          <CardContent>
            <SignInButton text="Sign In with Google" />
          </CardContent>
        </Card>
      </div>

    </main>
  );
}
