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
  },
  callbacks: {
    //async jwt({ token, user, account, profile, isNewUser }: any) {
    async jwt({ token }) {
      console.log(token);
      const fullname = token.name;
      const email = token.email;
      const image = token.picture;

      await connectDB();
      const userFound = await User.findOne({ email: token.email });

      if (userFound) {
        token.id = userFound._id; // * adding to the token the id of the user database
        return token;
        //return {...token, createdAt: userFound?.createdAt, image: userFound?.image, username: userFound?.username, _id: userFound._id};
      } else {
        await connectDB();
        const newUser = await User.create({ fullname, email, image });
        token.id = newUser._id;
        console.log(newUser, token.id);
        return token
      }
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.id
        session.user.fullname = token.fullname
        session.user.email = token.email
        session.user.image = token.image
      }
      return session;
    },

  },
  secret: process.env.NEXTAUTH_SECRET as string,

}


export const getAuthSession = () => {
  return getServerSession(authOptions)
}