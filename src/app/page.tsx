import SignInButton from "@/components/SignInButton";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getAuthSession } from "@/lib/nextauth";
import { redirect } from "next/navigation";




export default async function Home() {
  const session = await getAuthSession()
  if (session?.user) return redirect('dashboard')

  return (
    <main>
      <div className="h-[90vh] flex items-center justify-center">
        <Card className="w-[90%] md:w-[500px] h-[250px] space-y-4">
          <CardHeader>
            <CardTitle className="text-xl">Be brave and face our Triviathon AI site</CardTitle>
            <CardDescription>
              &nbsp; Triviathon AI is an application that uses AI to generate questions and answers.
              <br />
              &nbsp; This app is being developed by Dan Chanivet:

            </CardDescription>

            <a className="text-blue-500 hover:text-blue-700 underline" href="https://www.chanivetdan.tech" target="_blank">triviathon creator </a>
          </CardHeader>
          <CardContent className="text-center">
            <SignInButton text="Sign in with Google" />
          </CardContent>
        </Card>
      </div>

    </main>
  );
}
