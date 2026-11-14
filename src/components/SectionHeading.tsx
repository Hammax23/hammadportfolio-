import type { ReactNode } from "react";

type Props = {
  isPage?: boolean;
  className?: string;
  children: ReactNode;
};

export function SectionHeading({ isPage = false, className = "", children }: Props) {
  const Tag = isPage ? "h1" : "h2";
  return <Tag className={className}>{children}</Tag>;
}
