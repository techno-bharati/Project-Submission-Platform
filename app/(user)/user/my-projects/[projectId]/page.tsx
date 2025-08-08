import getUserProjectByIdAction from "@/actions/getUserProjectById";
import { Title, Title2 } from "@/components/Typography";
import Image from "next/image";
import { format } from "date-fns";
import ProjectStatusIndicator from "../_components/ProjectStatusIndicator";
import { Badge } from "@/components/ui/badge";

export default async function StudentProjectPage({
  params
}: {
  params: { projectId: string };
}) {
  const { projectId } = params;
  const project = await getUserProjectByIdAction(projectId);

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-500">Project not found</div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Title className="font-semibold">{project.title}</Title>
        <ProjectStatusIndicator projectStatus={project.verificationStatus} />
      </div>

      <Image
        width={1000}
        height={1000}
        src={project.projectThumbnail}
        alt={project.title}
        className="w-full h-64 object-cover rounded-lg mb-6"
      />

      <p className="mb-4">{project.description}</p>

      <div className="mb-4">
        <Title2>Domain</Title2>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.domain.map((domain, index) => (
            <Badge key={index} className="sm:text-sm rounded-full">
              {domain}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <Title2>Technologies</Title2>
        <div className="flex flex-wrap gap-2 mt-1">
          {project.technologies.map((technology, index) => (
            <Badge key={index} className="capitalize sm:text-sm rounded-full">
              {technology}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          GitHub Repo
        </a>
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-600 underline"
          >
            Live Demo
          </a>
        )}
      </div>

      <div className="text-sm text-gray-500">
        <p>Created: {format(project.createdAt, "MMMM dd, yyyy, hh:mm a")}</p>
      </div>
    </div>
  );
}
