import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware
export default withAuth({
  callbacks: {
    async authorized({ req, token }) {
      const { pathname } = req.nextUrl;
      const roles = { isAdmin: false, isMentor: false };
      return true;
    },
  },
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: ["/admin", "/mentor", "/", "/dashboard/:path*"],
};
