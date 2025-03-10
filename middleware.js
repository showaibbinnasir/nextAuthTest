import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login", // Redirect unauthenticated users
  },
});

export const config = { matcher: ["/dashboard", "/"] };