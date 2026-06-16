import type { MetadataRoute } from "next";
import { BASE_PATH } from "../consts/urls/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "붐힐랜드",
    short_name: "붐힐랜드",
    description: "붐힐랜드의 다양한 게임을 즐겨보세요!",
    start_url: BASE_PATH,
    display: "standalone",
    background_color: "#98ECFF",
    theme_color: "#48A6F8",
    icons: [
      {
        src: `${BASE_PATH}/icons/android-chrome-192x192.png`,
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: `${BASE_PATH}/icons/android-chrome-512x512.png`,
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
