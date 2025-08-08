import { Projects } from "@prisma/client";
import React from "react";

import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { Link } from "next-view-transitions";
import ProjectStatusIndicator from "./ProjectStatusIndicator";

const ProjectCard = ({ project }: { project: Projects }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardFooter className="justify-between">
        <ProjectStatusIndicator projectStatus={project.verificationStatus} />
        <Link
          href={`/user/my-projects/${project.id}`}
          className={buttonVariants({
            variant: "secondary",
            size: "sm"
          })}
        >
          View
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ProjectCard;
