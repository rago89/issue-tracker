"use client";
import React, { useEffect } from "react";
import "easymde/dist/easymde.min.css";
import { Button, Callout, TextField } from "@radix-ui/themes";
import { useForm, Controller } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createIssueSchema } from "@/app/validationSchemas/createIssueSchema";
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import dynamic from "next/dynamic";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

type NewIssueForm = z.infer<typeof createIssueSchema>;

const NewIssuePage = () => {
  const router = useRouter();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<NewIssueForm>({
    resolver: zodResolver(createIssueSchema),
  });
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        setError(null);
      }, 2000);
    }
  }, [error]);

  const onSubmit = handleSubmit(async data => {
    try {
      setLoading(true);
      await axios.post("/api/issues", data);
      router.push("/issues");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setLoading(false);
        const axiosError = error as AxiosError;
        let errorMessage = "";
        if (axiosError.response?.status === 400) {
          (axiosError.response.data as { error: z.ZodError[] }).error.forEach(
            err => {
              errorMessage += "  " + err.message;
            }
          );
          if (errorMessage) {
            setError(errorMessage);
          }
        }
      }
    }
  });

  return (
    <div className="max-w-xl">
      {error && (
        <Callout.Root color="red" className="mb-5">
          <Callout.Text>{error}</Callout.Text>
        </Callout.Root>
      )}
      <form className=" space-y-3" onSubmit={onSubmit}>
        <TextField.Root placeholder="Title" {...register("title")}>
          <TextField.Slot></TextField.Slot>
        </TextField.Root>
        {<ErrorMessage>{errors.title?.message}</ErrorMessage>}{" "}
        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <SimpleMDE placeholder="Description" {...field} />
          )}
        />
        {<ErrorMessage>{errors.description?.message}</ErrorMessage>}
        <Button disabled={loading}>
          Submit New Issue {loading && <Spinner height={4} width={4} />}
        </Button>
      </form>
    </div>
  );
};

export default NewIssuePage;
