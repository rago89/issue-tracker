import { Box, Card, Flex } from "@radix-ui/themes";
import { Skeleton } from "@/app/components";

const loadingSingleIssue = () => {
  return (
    <Box className="max-w-xl">
      <Skeleton width="5rem" />
      <Flex gap="5" className="my-5">
        <Skeleton width="5rem" />
        <Skeleton width="8rem" />
      </Flex>
      <Card className="prose" mt="4">
        <Skeleton count={5} />
      </Card>
    </Box>
  );
};

export default loadingSingleIssue;
