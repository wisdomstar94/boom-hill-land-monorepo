import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  if (process.env.NEXT_PUBLIC_IS_LOCAL !== "true") {
    return <>invalid access</>;
  }

  return <>{children}</>;
}
