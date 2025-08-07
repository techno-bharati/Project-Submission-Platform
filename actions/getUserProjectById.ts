"use server";

import { prisma } from "@/lib/prisma";
import GetUser from "./getUser";

export default async function getUserProjectByIdAction(projectId: string) {
  const user = await GetUser();

  try {
    const project = await prisma.projects.findUnique({
      where: {
        id: Number(projectId),
        userId: user.id
      }
    });

    if (!project) return null;

    return project;
  } catch (error) {
    console.error("Get User Project By Id Action Failed:: ", error);
    return null;
  }
}
