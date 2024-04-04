import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

const NoProjectCard = () => {
  return (
    <div className="flex justify-center h-screen w-screen my-auto">
      <div className="flex flex-col justify-center">
        <p>Login</p>
        <Card>
          <CardHeader>
            <CardTitle>No Projects</CardTitle>
            <CardDescription>
              Create a new project to create mailing lists and send emails.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button>Create Project</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default NoProjectCard;
