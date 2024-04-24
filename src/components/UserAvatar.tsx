import Image from "next/image"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { User } from "next-auth"


type Props = {
  user: Pick<User, 'name' | 'image'>
}

const UserAvatar = ({ user }: Props) => {
  return (
    <Avatar>
      {
        user.image
          ? (
            <div className="relative w-full h-full aspect-square">
              <Image src={user.image} alt="User avatar" fill={true} sizes='(max-width: 768px) 100vw, 33vw' referrerPolicy="no-referrer" />
            </div>
          )
          : (
            <AvatarFallback>
              <span className="sr-only">{user.name}</span>
            </AvatarFallback>
          )
      }

    </Avatar>
  )
}

export default UserAvatar