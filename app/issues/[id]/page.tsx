import { Box, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";

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
    <Grid columns={{ initial: "1", md: "2" }} gap="5">
      <Box>
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <EditIssueButton id={issue.id} />
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
