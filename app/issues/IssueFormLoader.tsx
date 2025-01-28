"use client";
import React from "react";
import dynamic from "next/dynamic";
import IssueFormSkeleton from "./loading";
import { Issue } from "@prisma/client";

const IssueForm = dynamic(() => import("@/app/issues/_components/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

type Props = {
  issue?: Issue;
};

const IssueFormLoader = ({ issue }: Props) => {
  return <IssueForm issue={issue} />;
};

export default IssueFormLoader;
