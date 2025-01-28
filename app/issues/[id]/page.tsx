import { Box, Flex, Grid } from "@radix-ui/themes";
import delay from "delay";
import { notFound } from "next/navigation";
import { prisma } from "../../../prisma/client";
import EditIssueButton from "./EditIssueButton";
import IssueDetails from "./IssueDetails";
import DeleteIssueButton from "./DeleteIssueButton";

type Props = {
  params: { id: string };
};

const IssueDetailPage = async ({ params }: Props) => {
  const { id: idAString } = await params;
  const id = Number(idAString);

  if (isNaN(id)) notFound();
  const issue = await prisma.issue.findUnique({
    where: {
      id: id,
    },
  });

  await delay(500);

  if (!issue) notFound();
  return (
    <Grid columns={{ initial: "1", sm: "5" }} gap="5">
      <Box className="md:col-span-4">
        <IssueDetails issue={issue} />
      </Box>
      <Box>
        <Flex direction="column" gap="4">
          <EditIssueButton id={issue.id} />
          <DeleteIssueButton id={issue.id} />
        </Flex>
      </Box>
    </Grid>
  );
};

export default IssueDetailPage;
