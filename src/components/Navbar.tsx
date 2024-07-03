import { getAuthSession } from "@/lib/nextauth"
import Link from "next/link"
import SignInButton from "./SignInButton"
import UserAccountNav from "./UserAccountNav"
import { ThemeToggle } from "./ThemeToggle"


type Props = {}

const Navbar = async (props: Props) => {

  const session = await getAuthSession()
  // console.log('Session caught from client: ', session);
  //{JSON.stringify(session?.user, null, 2)}

  return (
    <nav className="bgl dark:bgd z-[10] border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between gap-2 px-8 mx-auto max-w-7xl">

        <div className="flex items-center">
          <ThemeToggle className="mr-4" />
          <div className="flex items-center">
            {
              session?.user
                ? <UserAccountNav user={session.user} />
                : <SignInButton text="Sign in" />
            }
          </div>
        </div>
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2" >
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-rose-50">
            Beat the AI
          </p>
        </Link>
      </div>
    </nav>
  )
}



export default Navbar