import type { ReactNode } from "react";
import { CurrentTime } from "./_components/current-time";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <CurrentTime />
    </>
  );
}
