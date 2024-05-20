/* eslint-disable no-unused-vars */

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewProjectButton from "./NewProjectButton";

interface NoProjectCardProps {
  createProject: (projectName: string) => void;
}

export default function NoProjectCard({ createProject }: NoProjectCardProps) {
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
            <NewProjectButton createProject={createProject} />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};
