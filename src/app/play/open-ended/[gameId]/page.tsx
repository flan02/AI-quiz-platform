import OpenEnded from "@/components/OpenEnded";
import { getAuthSession } from "@/lib/nextauth";
import { getGame } from "@/services/server";
import { redirect } from "next/navigation";


type Props = {
  params: {
    gameId: string;
  };
};

const OpenEndedPage = async ({ params }: Props) => {
  const session = await getAuthSession();
  if (!session?.user) return redirect("/");

  const game = await getGame(params.gameId)

  if (!game || game.gameType !== "open_ended") return redirect("/quiz");

  return <OpenEnded game={game} />;
};

export default OpenEndedPage;