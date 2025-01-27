import React from "react";
import { prisma } from "../../../prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  const id = Number(params.id);
  if (isNaN(id)) notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  await delay(500);

  if (!issue) notFound();
  return (
    <div>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toLocaleString()}</p>
    </div>
  );
};

export default IssueDetailPage;
