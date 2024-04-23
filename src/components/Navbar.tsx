import { getAuthSession } from "@/lib/nextauth"
import Link from "next/link"
import SignInButton from "./SignInButton"
import Logout from "./Logout"


type Props = {}

const Navbar = async (props: Props) => {

  const session = await getAuthSession()
  console.log(session);
  if (session?.user) {
    return <pre>{JSON.stringify(session.user, null, 2)}</pre>
  } else {
    return <nav className="fixed inset-x-0 top-0 bgl dark:bgd z-[10] h-fix border-b border-zinc-300 py-2">
      <div className="flex items-center justify-between h-full gap-2 px-8 mx-auto max-w-7xl">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2" >
          <p className="rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-rose-50">
            Quiz AI
          </p>
        </Link>
        <div className="flex items-center">
          <SignInButton text="Sign In" />
          <Logout text="Sign Out" />
        </div>
      </div>
    </nav>
  }

}

export default Navbar