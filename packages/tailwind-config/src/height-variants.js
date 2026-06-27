import plugin from "tailwindcss/plugin";

/**
 * height 기준 반응형 variant 플러그인.
 *
 * 사용 예시:
 *   hmin-[120px]:text-lg   →  @media (min-height: 120px) { ... }
 *   hmax-[133px]:hidden    →  @media (max-height: 133px) { ... }
 *
 * 자주 쓰는 값은 아래 values 맵에 등록하면 이름으로도 사용 가능.
 *   hmin-md:text-lg        →  @media (min-height: 640px) { ... }
 */
export default plugin(({ matchVariant }) => {
  const values = {
    sm: "480px",
    md: "640px",
    lg: "768px",
    xl: "1024px",
  };

  matchVariant("hmin", (value) => `@media (min-height: ${value})`, { values });
  matchVariant("hmax", (value) => `@media (max-height: ${value})`, { values });
});
