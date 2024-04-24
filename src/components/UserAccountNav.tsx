'use client'
import { User } from "@/types"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu"
import Image from "next/image"
import Link from "next/link"
import { signOut } from "next-auth/react"
import { Button } from "./ui/button"
import { LogOut } from "lucide-react"
import UserAvatar from "./UserAvatar"




type Props = {
  user: User
  // pickWay: Pick<User, 'name' | 'image'>
  //<omitWay: Omit<User, 'id'>
}
const UserAccountNav = ({ user }: Props) => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        {/*<Button className="bg-teal-700">Profile</Button>*/}
        {/* user avatar */}
        <UserAvatar image={user.image} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bgl" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">

            {user.name && <p className="text-lg font-semibold">{user.name}</p>}
            {user.email && <p className="text-sm text-zinc-600">{user.email}</p>}
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/'>Meow</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={(e) => {
            e.preventDefault()
            signOut().catch
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