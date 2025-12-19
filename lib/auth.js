import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db.js";
import User from "@/models/User.js";


console.log("NEXTAUTH_SECRET status:", process.env.NEXTAUTH_SECRET ? "DEFINED" : "UNDEFINED");
console.log("MONGODB_URI status:", process.env.MONGODB_URI ? "DEFINED" : "UNDEFINED");

export const authOptions = {
  debug: true, // Enable debug logs

  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        console.log("Authorize called with:", { email: credentials?.email }); // Security: Don't log password

        try {
          await connectDB();
          console.log("DB Connected");
        } catch (dbError) {
          console.error("DB Connection Failed:", dbError);
          throw new Error("Database connection failed");
        }

        const user = await User.findOne({ email: credentials.email }).select("+password +role"); // selecting password explicitly if it was set to select:false

        console.log("User search result:", user ? "Found" : "Not Found");

        if (!user) {
          console.log("User not found in DB");
          throw new Error("User not found");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        console.log("Password validation:", isValid ? "Valid" : "Invalid");

        if (!isValid) {
          console.log("Invalid password provided");
          throw new Error("Invalid password");
        }

        return {
          id: user._id.toString(), // Ensure string
          email: user.email,
          role: user.role,
          name: user.name,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };


//Shows role-based auth, JWT control, secure login.