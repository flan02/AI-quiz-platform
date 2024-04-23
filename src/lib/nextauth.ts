import User from "@/models/user"
import { connectDB } from "./mongodb";
import { DefaultSession, getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';


declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      fullname: string;
      email: string;
      image: string;
    };
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
  }
}



export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 3600, // * 1 hour
    updateAge: 1800, // * 5 minutes

  },
  callbacks: {
    //async jwt({ token, user, account, profile, isNewUser, session }: any) {
    async jwt({ token }) {

      const fullname = token.name;
      const email = token.email;
      const image = token.picture;

      await connectDB();
      const userFound = await User.findOne({ email: token.email }); // ? find the user in the database

      if (userFound) {
        token.id = userFound._id; // * adding to the token the id of the user database
        return token;
        //return {...token, createdAt: userFound?.createdAt, image: userFound?.image, username: userFound?.username, _id: userFound._id};
      }

      return token
      /*
      else {
        await connectDB();
        const newUser = await User.create({ fullname, email, image });
        token.id = newUser._id;
        console.log(newUser, token.id);
        return token
      }
       */
    },
    async session({ session, token }: any) {
      if (token) {

        session.user.fullname = token.name
        session.user.email = token.email
        session.user.id = token.id
        session.user.image = token.picture
        session.user.sub = token.sub
        session.user.exp = token.exp
        session.user.iat = token.iat
        session.user.jti = token.jti
        session.user.expires = session['expires']

      }

      console.log('Values of the token', session);
      return session;
    },

  },
  secret: process.env.NEXTAUTH_SECRET as string,

}


export const getAuthSession = () => {

  return getServerSession(authOptions)
}