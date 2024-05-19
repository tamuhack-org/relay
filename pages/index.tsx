import Navbar from "@/components/common/Navbar";
import NoProjectCard from "@/components/common/NoProjectCard";
import { Project } from "@prisma/client";
import { useEffect, useState } from "react";
import { FullProject } from "./api/projects/[projectId]";

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

  async function createProject() {
    const response = await fetch("/api/projects/new", {
      method: "POST",
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
        <NoProjectCard onClick={createProject} />
      ) : (
        <div>
          <div className="grid grid-cols-1 w-64">
            <select className="">
              {projects.map((project) => (
                <option key={project.projectId}>{project.projectName}</option>
              ))}
            </select>
            <div>
              <button onClick={createProject}>Create Project</button>
            </div>
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

        </div>
      )}

    </>
  );
}
