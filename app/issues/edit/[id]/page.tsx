import { prisma } from "@/prisma/client";
import { notFound } from "next/navigation";
import IssueFormLoader from "../../IssueFormLoader";

type Props = {
  params: { id: number };
};

const page = async ({ params }: Props) => {
  const { id: idAString } = await params;
  const id = Number(idAString);
  if (isNaN(id)) notFound();

  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });
  if (!issue) notFound();
  return <IssueFormLoader issue={issue} />;
};

export default page;
