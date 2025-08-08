import { ProjectVerificationStatus } from "@prisma/client";
import { CheckCircle, XCircle, Clock } from "lucide-react";
import React from "react";
import clsx from "clsx";

const statusConfig = {
  PENDING: {
    label: "Pending",
    icon: Clock,
    color: "text-yellow-600 bg-yellow-100"
  },
  VERIFIED: {
    label: "Verified",
    icon: CheckCircle,
    color: "text-green-600 bg-green-100"
  },
  REJECTED: {
    label: "Rejected",
    icon: XCircle,
    color: "text-red-600 bg-red-100"
  }
};

const ProjectStatusIndicator = ({
  projectStatus
}: {
  projectStatus: ProjectVerificationStatus;
}) => {
  const config = statusConfig[projectStatus];
  const Icon = config.icon;

  return (
    <div
      className={clsx(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
        config.color
      )}
    >
      <Icon className="w-4 h-4" />
      {config.label}
    </div>
  );
};

export default ProjectStatusIndicator;
