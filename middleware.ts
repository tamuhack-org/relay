import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    authorized({ token }) {
      if (token) {
        return true;
      } else {
        return false;
      }
    },
  },
  pages: {
    signIn: "/signin",
  },
});

// Add protected routes here
export const config = {
  matcher: ["/"],
};
