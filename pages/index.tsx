import NoProjectCard from "@/components/common/NoProjectCard";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { FullProject } from "./api/projects/[projectId]";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import NewProjectButton from "@/components/common/NewProjectButton";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<FullProject | null>(null);

  async function fetchSelectedProject(projectId: string) {
    setSelectedProject(null);
    const response = await fetch(`/api/projects/${projectId}`);
    const responseData = await response.json();
    setSelectedProject(responseData.fullProject);
  }

  useEffect(() => {
    async function fetchProjects() {
      const response = await fetch("/api/projects/all");
      const responseData = await response.json();
      setProjects(responseData.projects);

      if (responseData.projects.length > 0) {
        fetchSelectedProject(responseData.projects[0].projectId);
      }
    }
    fetchProjects();
  }, []);

  async function createProject(projectName: string) {
    const response = await fetch("/api/projects/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ projectName }),
    });
    const responseData = await response.json();
    if (responseData.newProject) {
      setProjects([
        ...projects,
        responseData.newProject
      ]);

      fetchSelectedProject(responseData.newProject.projectId);
    }
  }

  return (
    <>
      {projects.length === 0 ? (
        <NoProjectCard createProject={createProject} />
      ) : (
        <main className="w-full flex flex-col h-full p-4">
          <div className="flex gap-4">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select Project">
                  {selectedProject?.projectName}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem
                    value={project.projectId}
                    key={project.projectId}
                    onClick={() => fetchSelectedProject(project.projectId)}
                  >
                    {project.projectName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <NewProjectButton createProject={createProject} />
          </div>

          <div className="mt-10">
            <h1 className="text-2xl font-bold">Templates</h1>
            <div className="grid grid-cols-3 gap-4">
              {selectedProject?.templates.map((template) => (
                <div key={template.templateId} className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-bold">{template.name}</h2>
                  <p>{template.content}</p>
                </div>
              ))}
              <button>New Template</button>
            </div>
          </div>

          <div className="mt-10">
            <h1 className="text-2xl font-bold">Mailing Lists</h1>
            <div className="grid grid-cols-3 gap-4">
              {selectedProject?.lists.map((mailingList) => (
                <div key={mailingList.id} className="bg-white p-4 rounded-md shadow-md">
                  <h2 className="text-lg font-bold">{mailingList.name}</h2>
                  <p>{mailingList.description}</p>
                </div>
              ))}
              <button>New Mailing List</button>
            </div>
          </div>

        </main>
      )}
    </>
  );
}
