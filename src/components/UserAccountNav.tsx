'use client'
import { User } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { LogOut } from "lucide-react"
import UserAvatar from "./UserAvatar"
import { useRouter } from "next/navigation"




type Props = {
  user: User
  // pickWay: Pick<User, 'name' | 'image'>
  //<omitWay: Omit<User, 'id'>
}
const UserAccountNav = ({ user }: Props) => {
  const router = useRouter()
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/* user avatar */}
        <UserAvatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bgl" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="text-lg font-semibold hover:underline">{user.name}</p>}
            {user.email && <p className="text-sm text-zinc-600">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href='/' className="text-muted-foreground">games</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/' className="text-muted-foreground">preferences</Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/' className="text-muted-foreground">settings</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            signOut().catch
            return router.push('/')
          }}
          className="text-rose-500 hover:text-rose-600 cursor-pointer"
        > Sign Out
          <LogOut className="w-4 h-4 ml-2" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserAccountNav