"use client";

import { Button } from "@boom-hill-land-monorepo/react-ui/components/button";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "../consts/urls/base-path";
import { WATER_BALLOON_POP_URL } from "../consts/urls/game-url.consts";

export default function Page() {
  const router = useRouter();

  return (
    <div
      className="w-full h-full fixed top-0 left-0 flex items-center justify-center bg-center bg-cover"
      style={{
        backgroundImage: `url('${BASE_PATH}/background/boom-hill-background-image.png')`,
      }}
    >
      <div className="inline-flex flex-col gap-2 items-center bg-white/70 p-4 rounded-md">
        <div className="text-2xl font-medium">붐힐랜드</div>
        <div className="inline-flex flex-wrap gap-2 relative max-w-full box-border px-2">
          <Button
            onClick={() => {
              router.push(WATER_BALLOON_POP_URL);
            }}
            variant="BLUE"
          >
            물풍선 팡팡
          </Button>
        </div>
      </div>
    </div>
  );
}
