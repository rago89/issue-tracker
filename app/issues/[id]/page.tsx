import React from "react";
import { prisma } from "../../../prisma/client";
import { notFound } from "next/navigation";
import delay from "delay";
import { Card, Flex, Heading, Text } from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import ReactMarkdown from "react-markdown";

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
      <Heading>{issue.title}</Heading>
      <Flex gap="5" className="my-5">
        <IssueStatusBadge status={issue.status} />
        <Text>{issue.createdAt.toLocaleString()}</Text>
      </Flex>
      <Card className="prose" mt="4">
        <ReactMarkdown>{issue.description}</ReactMarkdown>
      </Card>
    </div>
  );
};

export default IssueDetailPage;
