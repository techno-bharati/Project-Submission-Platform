"use server";

import { prisma } from "@/lib/prisma";
import GetUser from "./getUser";
import { redirect } from "next/navigation";

export default async function verifyAdmin() {
  const user = await GetUser();

  try {
    const dbUser = await prisma.user.findUnique({
      where: {
        id: user.id
      }
    });

    if (dbUser?.role !== "admin") {
      redirect("/not-admin");
    }

    return true;
  } catch (error) {
    console.error("Error verifying admin:", error);
    return false;
  }
}
