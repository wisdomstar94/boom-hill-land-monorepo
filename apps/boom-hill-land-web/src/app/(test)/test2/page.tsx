"use client";

import { Button } from "@boom-hill-land-monorepo/react-ui/components/button";
import { animate } from "animejs";
import { useRef } from "react";

export default function Page() {
  const boxRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   if (boxRef.current === null) {
  //     return;
  //   }

  //   const animation1 = animate(boxRef.current, {
  //     x: "100px",
  //     duration: 300,
  //     loop: 3,
  //     onLoop: (self) => {
  //       self.refresh();
  //     },
  //   });

  //   const animation2 = animate(boxRef.current, {
  //     rotate: "90deg",
  //     duration: 1000,
  //     loop: 2,
  //     onLoop: (self) => {
  //       self.refresh();
  //     },
  //   });

  //   return () => {
  //     if (boxRef.current === null) {
  //       return;
  //     }
  //     animation1.pause();
  //     animation2.pause();
  //   };
  // }, []);

  return (
    <div className="flex flex-col gap-2">
      <div ref={boxRef} className="size-10 bg-red-500 relative">
        <div className="size-2 bg-blue-500 absolute top-0 left-0" />
      </div>
      <Button
        onClick={() => {
          if (boxRef.current === null) {
            return;
          }
          animate(boxRef.current, {
            x: "+=100px", // += 등의 현재값을 기준으로 하는 증감은 loop 적용시 누적 안됨. 0 -> 100, 0 -> 100 ... 반복함.
            duration: 300,
          });
        }}
      >
        append x
      </Button>
    </div>
  );
}
