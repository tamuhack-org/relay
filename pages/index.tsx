import { signOut } from "next-auth/react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex justify-center h-screen w-screen my-auto">
      <div className="flex flex-col justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Welcome</CardTitle>
            <CardDescription>Sign in to Relay</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={() => signOut()}>Sign out with Google</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
