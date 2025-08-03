"use server";

import { FormTypeSubmitProject } from "@/components/Forms/SubmitProjectForm";
import GetUser from "./getUser";
import { prisma } from "@/lib/prisma";

export default async function SubmitProject(data: FormTypeSubmitProject) {
  const user = await GetUser();

  try {
    await prisma.projects.create({
      data: { ...data, userId: user.id }
    });

    return { success: true, msg: "Project created." };
  } catch (error) {
    console.error(error);
    return { success: false, msg: "Project not created." };
  }
}
