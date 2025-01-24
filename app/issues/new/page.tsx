"use client";
import React, { use, useEffect } from "react";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface NewIssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const router = useRouter();
  const { register, control, handleSubmit } = useForm<NewIssueForm>();
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form
        className=" space-y-3"
        onSubmit={handleSubmit(async data => {
          try {
            await axios.post("/api/issues", data);
            router.push("/issues");
          } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
              const axiosError = error as AxiosError;
              let errorMessage = "";
              if (axiosError.response?.status === 400) {
                (
                  axiosError.response.data as { error: z.ZodError[] }
                ).error.forEach(err => {
                  errorMessage += " - " + err.message;
                });
                if (errorMessage) {
                  setError(errorMessage);
                }
              }
            }
          }
        })}>
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        <Button>Submit New Issue</Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
