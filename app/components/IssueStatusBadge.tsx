import { Status } from "@prisma/client";
import { Badge } from "@radix-ui/themes";
import React from "react";
import { badgePropDefs } from "@radix-ui/themes/props";

type Props = {
  status: Status;
};

type BadgeColor = (typeof badgePropDefs.color.values)[number];

const statusMap: Record<Status, { label: string; color: BadgeColor }> = {
  OPEN: { label: "Open", color: "red" },
  IN_PROGRESS: { label: "In Progress", color: "violet" },
  CLOSED: { label: "Closed", color: "green" },
};

const IssueStatusBadge = ({ status }: Props) => {
  const currentStatus = statusMap[status];
  return <Badge color={currentStatus.color}>{currentStatus.label}</Badge>;
};

export default IssueStatusBadge;
