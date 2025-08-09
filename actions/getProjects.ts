"use server";

import { prisma } from "@/lib/prisma";
import verifyAdmin from "./verifyAdmin";

export default async function getProjects() {
  await verifyAdmin();

  try {
    const projects = await prisma.projects.findMany({
      include: {
        user: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return projects.map((project) => ({
      id: String(project.id),
      name: project.title,
      verificationStatus: project.verificationStatus,
      studentName: project.user.name
    }));
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}
