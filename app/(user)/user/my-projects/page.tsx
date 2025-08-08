import getUserProjectsAction from "@/actions/getUserProjects";
import React from "react";
import ProjectCard from "./_components/ProjectCard";
import { Title } from "@/components/Typography";

const UserProjectPage = async () => {
  const userProjects = await getUserProjectsAction();

  if (!userProjects) {
    return <div>User don&apos;t have any projects.</div>;
  }

  return (
    <section className="max-w-5xl mx-auto space-y-3">
      <div className="border-b">
        <Title>My Projects</Title>
      </div>
      {userProjects.map((project) => (
        <ProjectCard project={project} key={project.id} />
      ))}
    </section>
  );
};

export default UserProjectPage;
