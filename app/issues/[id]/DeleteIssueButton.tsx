"use client";
import { AlertDialog, Button, Flex } from "@radix-ui/themes";
import axios from "axios";
import { useRouter } from "next/navigation";

const DeleteIssueButton = ({ id }: { id: number }) => {
  const router = useRouter();
  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red">Delete Issue</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
          <AlertDialog.Description>
            Are you sure you want to delete this issue?
          </AlertDialog.Description>
          <Flex gap="4" mt="4">
            <AlertDialog.Cancel>
              <Button>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button
                onClick={async () => {
                  const isDeleted = await axios.delete<{ success: boolean }>(
                    `/api/issues/${id}`
                  );
                  if (isDeleted.data.success) {
                    router.push("/issues");
                  }
                }}
                color="red">
                Delete Issue
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  );
};

export default DeleteIssueButton;
