import type { ReactNode } from "react";

export type TestWebLayoutProps = {
  menuNavBarSlot: ReactNode;
  children: ReactNode;
};

export function TestWebLayout(props: TestWebLayoutProps) {
  const { menuNavBarSlot, children } = props;

  return (
    <div className="w-full flex flex-col gap-2 relative p-4 box-border">
      <div className={"w-full flex flex-col gap-1 relative items-start"}>{menuNavBarSlot}</div>
      <div className="w-full flex flex-col gap-2 relative">{children}</div>
    </div>
  );
}
