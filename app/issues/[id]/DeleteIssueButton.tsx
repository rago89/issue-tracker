import { Button } from "@radix-ui/themes";
import Link from "next/link";

const DeleteIssueButton = ({ id }: { id: number }) => {
  return (
    <Button color="red">
      <Link href={`/issues/${id}/delete`}>Delete Issue</Link>
    </Button>
  );
};

export default DeleteIssueButton;
