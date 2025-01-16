import { Session as NextAuthSession } from "next-auth";

export default interface Session extends NextAuthSession {
  user: User;
  expires: string
}

interface User {
  name: string;
  email: string;
  image: string;
}