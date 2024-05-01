import { NextRequest, NextResponse } from "next/server"
import { getAuthSession } from "@/lib/nextauth";



export async function middleware(req: NextRequest, _res: NextResponse) {
  const session = await getAuthSession()
  //console.log(session);
  if (!session) return NextResponse.redirect('/')
  console.log('Middleware Request is:', req);
  //const rawCookie = req.headers.get('cookie')
  //console.log('Cookie for this session is: ', rawCookie);
  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/play/:path*', '/quiz/:path*', '/history/:path*']
}
