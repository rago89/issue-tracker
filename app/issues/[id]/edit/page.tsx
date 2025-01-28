import React from "react";
import IssueForm from "../../_components/IssueForm";
import { notFound } from "next/navigation";
import { prisma } from "@/prisma/client";

type Props = {
  params: { id: number };
};

const page = async ({ params }: Props) => {
  const id = Number(params.id);
  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
  if (!issue) notFound();
  return <IssueForm issue={issue} />;
};

export default page;
