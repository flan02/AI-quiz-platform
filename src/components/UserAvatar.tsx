import Image from "next/image"
//import { Avatar, AvatarFallback } from "./ui/avatar"

type Props = {
  image: string
}

const UserAvatar = ({ image }: Props) => {
  return (
    <div className="relative w-12 h-12">
      <Image src={image} alt="User avatar" layout="fill" objectFit="cover" />
    </div>
  )
}

export default UserAvatar