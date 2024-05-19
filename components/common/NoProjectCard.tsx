import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

type NoProjectCardProps = {
  onClick: () => void;
};

export default function NoProjectCard(props: NoProjectCardProps) {
  

  return (
    <div className="flex justify-center h-screen w-screen my-auto">
      <div className="flex flex-col justify-center">
        <Card>
          <CardHeader>
            <CardTitle>No Projects</CardTitle>
            <CardDescription>
              Create a new project to create mailing lists and send emails.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button onClick={props.onClick}>Create Project</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
