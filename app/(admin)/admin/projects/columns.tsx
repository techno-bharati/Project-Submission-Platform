"use client";

import ProjectStatusIndicator from "@/app/(user)/user/my-projects/_components/ProjectStatusIndicator";
import { $Enums, ProjectVerificationStatus } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export type Project = {
  id: string;
  name: string;
  verificationStatus: $Enums.ProjectVerificationStatus;
  studentName: string;
};

export const columns: ColumnDef<Project>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "name",
    header: "Project Name"
  },
  {
    accessorKey: "verificationStatus",
    header: "Status",
    cell: ({ row }) => {
      const status = String(
        row.getValue("verificationStatus")
      ) as ProjectVerificationStatus;
      return <ProjectStatusIndicator projectStatus={status} />;
    }
  },
  {
    accessorKey: "studentName",
    header: "Uploaded By"
  }
];
