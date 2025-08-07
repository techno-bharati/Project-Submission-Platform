"use server";

import { prisma } from "@/lib/prisma";
import GetUser from "./getUser";

export default async function getUserProjectsAction() {
  const user = await GetUser();

  try {
    const projects = await prisma.projects.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: "asc"
      }
    });

    if (projects.length === 0) return null;

    return projects;
  } catch (error) {
    console.error("Get User Projects Action Failed:: ", error);
    return null;
  }
}
