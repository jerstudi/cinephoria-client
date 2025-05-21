"use client";

import { Typography } from "../ui/typography";

type SectionTitleProps = {
  title?: string;
};

export const SectionTitle = ({ title }: SectionTitleProps) => {
  return (
    <div className="flex items-center gap-4">
      {title ? (
        <Typography variant="h2" className="text-xs uppercase">
          {title}
        </Typography>
      ) : (
        <Typography variant="h2" className="text-xs uppercase">
          New Section
        </Typography>
      )}
      <div className="w-24 border border-b-0 border-solid border-red-600"></div>
    </div>
  );
};
