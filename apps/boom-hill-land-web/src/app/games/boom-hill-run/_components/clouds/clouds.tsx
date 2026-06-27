import NextImage from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimationDiv } from "../../../../../components/animation-div";
import { BASE_PATH } from "../../../../../consts/urls/base-path";
import { getRandomNumber } from "../../../../../macros/get-random-number";

export type CloudsProps = {
  width: number;
};

const cloudImages = [
  `${BASE_PATH}/natures/cloud/cloud-001.png`,
  `${BASE_PATH}/natures/cloud/cloud-002.png`,
  `${BASE_PATH}/natures/cloud/cloud-003.png`,
];

const cloudVerticalPositions = [
  10, 100, 150, 200, 250, 300, 350, -10, -100, -150, -200, -250, -300, -350,
];

const cloudVerticalPositions2 = [
  5, 120, 170, 220, 270, 320, 370, -5, -120, -170, -220, -270, -320, -370,
];

const cloudDelayLimit = {
  min: 0,
  max: 6000,
};

const cloudDurationLimit = {
  min: 1000 * 40,
  max: 1000 * 120,
};

export function Clouds(props: CloudsProps) {
  const { width } = props;

  const [mounted, setMounted] = useState(false);

  const clouds = useMemo(() => {
    if (!mounted) {
      return [];
    }

    return Array.from({ length: 14 }).map((_, index) => {
      const targetIndex = (index + 1) % cloudVerticalPositions.length;
      console.log(`#targetIndex`, targetIndex);
      const verticalPosition = cloudVerticalPositions[targetIndex];
      console.log(`#verticalPosition`, verticalPosition);

      return {
        animationParams: {
          animationName: `cloud-${index + 1}`,
          delay: getRandomNumber({ min: cloudDelayLimit.min, max: cloudDelayLimit.max }),
          translateX: { from: 450, to: -width - 300 },
          duration: getRandomNumber({ min: cloudDurationLimit.min, max: cloudDurationLimit.max }),
          loop: Number.POSITIVE_INFINITY,
        },
        imageUrl: cloudImages[getRandomNumber({ min: 0, max: cloudImages.length - 1 })],
        styles: {
          top: verticalPosition > 0 ? `${verticalPosition}px` : undefined,
          bottom: verticalPosition <= 0 ? `${-verticalPosition}px` : undefined,
        },
      };
    });
  }, [mounted, width]);

  const clouds2 = useMemo(() => {
    if (!mounted) {
      return [];
    }

    return Array.from({ length: 14 }).map((_, index) => {
      const targetIndex = (index + 1) % cloudVerticalPositions2.length;
      const verticalPosition = cloudVerticalPositions2[targetIndex];

      return {
        animationParams: {
          animationName: `cloud2-${index + 1}`,
          delay: getRandomNumber({ min: 1000 * 20, max: 1000 * 60 }),
          translateX: { from: 450, to: -width - 300 },
          duration: getRandomNumber({ min: cloudDurationLimit.min, max: cloudDurationLimit.max }),
          loop: Number.POSITIVE_INFINITY,
        },
        imageUrl: cloudImages[getRandomNumber({ min: 0, max: cloudImages.length - 1 })],
        styles: {
          top: verticalPosition > 0 ? `${verticalPosition}px` : undefined,
          bottom: verticalPosition <= 0 ? `${-verticalPosition}px` : undefined,
        },
      };
    });
  }, [mounted, width]);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      data-clouds={true}
      style={{
        width: `${width}px`,
      }}
      className="h-px absolute size-10 bg-purple-400 top-0 left-0 z-2 flex overflow-x-clip"
    >
      <div className="w-px h-screen flex items-center justify-end absolute top-0 right-0 shrink-0 grow-0">
        <div className="w-px h-px relative shrink-0 grow-0">
          {clouds.map((cloud) => (
            <div
              data-cloud={true}
              key={cloud.animationParams.animationName}
              className="shrink-0 grow-0 absolute right-0 opacity-10 transform-view"
              style={cloud.styles}
            >
              <AnimationDiv
                animationParams={cloud.animationParams}
                className="shrink-0 grow-0 w-[200px]! h-[100px]!"
              >
                <NextImage src={cloud.imageUrl} alt="cloud" width={200} height={100} />
              </AnimationDiv>
            </div>
          ))}

          {clouds2.map((cloud) => (
            <div
              data-cloud={true}
              key={cloud.animationParams.animationName}
              className="shrink-0 grow-0 absolute right-0 opacity-10 transform-view"
              style={cloud.styles}
            >
              <AnimationDiv
                animationParams={cloud.animationParams}
                className="shrink-0 grow-0 w-[200px]! h-[100px]!"
              >
                <NextImage src={cloud.imageUrl} alt="cloud" width={200} height={100} />
              </AnimationDiv>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
