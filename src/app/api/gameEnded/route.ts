import Game from "@/models/game";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const body = await req.json();
    console.log(body);
    const { gameId, timeEnded } = body;
    //console.log(gameId, timeEnded);
    const gameEnded = await Game.findByIdAndUpdate(gameId, { timeEnded });

    return NextResponse.json({ message: "Game Ended", status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Error", status: 500 });
  }
}