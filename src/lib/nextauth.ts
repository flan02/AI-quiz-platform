import User from "@/models/user"
import { connectDB } from "./mongodb";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { DefaultJWT, JWT } from "next-auth/jwt";




declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      fullname: string;
      email: string;
      image: string;
      sub: string
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    token: JWT
  }
}



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600,
    updateAge: 1800, // * 5 minutes

  },
  cookies: {
    sessionToken: {
      name: 'sessionToken',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true
      }
    }
  },
  callbacks: {
    async jwt({ token }: JWT) {
      //console.log('Values of the token', token);
      const newUser = {
        email: token.email,
        password: token.sub,
        fullname: token.name,
        image: token.picture,
        sub: token.sub
      }
      //console.log(newUser);

      try {
        await connectDB();
        const userFound = await User.findOne({ email: token.email }); // ? find the user in the database
        if (userFound) return token;
        await User.create(newUser);
        return token
      } catch (error) {
        console.log(error);
        return token
      }

    },
    async session({ session, token }: any) {
      //console.log('Starter session value: ', session);

      if (token) {
        session.user.sub = token.sub
        session.user.exp = token.exp
        session.user.iat = token.iat
        session.user.jti = token.jti
        session.user.expires = session['expires']


      }

      // console.log('Values of the token', session);
      return session;
    },

  },
  secret: process.env.NEXTAUTH_SECRET as string,


}


export const getAuthSession = () => {

  return getServerSession(authOptions)
}