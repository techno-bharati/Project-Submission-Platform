"use client";

import getUserProjectByIdAction from "@/actions/getUserProjectById";
import { Title, Title2 } from "@/components/Typography";
import Image from "next/image";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import ProjectStatusIndicator from "@/app/(user)/user/my-projects/_components/ProjectStatusIndicator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

export default function ProjectPage({
  params
}: {
  params: { projectId: string };
}) {
  const [open, setOpen] = useState(false);
  const { projectId } = params;

  const { data: project, isLoading } = useQuery({
    queryKey: ["user-project"],
    queryFn: async () => {
      const data = await getUserProjectByIdAction(projectId);
      return data;
    }
  });

  if (isLoading) {
    return (
      <div className="p-6 max-w-5xl mx-auto space-y-4">
        <div className="flex justify-between">
          <Skeleton className="w-72 h-10" />
          <Skeleton className="w-44 h-10" />
        </div>
        <Skeleton className="w-full h-52" />
        <Skeleton className="w-full h-40" />

        <div className="space-y-3">
          <Skeleton className="w-28 h-10" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className="w-32 h-8" key={i} />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Skeleton className="w-28 h-10" />
          <div className="flex gap-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <Skeleton className="w-32 h-8" key={i} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="p-6 text-center text-gray-500">Project not found</div>
    );
  }

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Textarea />
          </div>
        </DialogContent>
      </Dialog>
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
        <div className="w-full flex justify-end gap-2 py-2">
          <Button
            variant={"destructive"}
            className="border"
            onClick={() => setOpen(true)}
          >
            Reject Project
          </Button>
          <Button variant={"secondary"} className="border">
            Confirm
          </Button>
        </div>
      </div>
    </>
  );
}
