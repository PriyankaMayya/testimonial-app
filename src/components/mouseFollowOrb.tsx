import { useMousePosition } from "@/hooks/useMousePosition";

interface MouseFollowOrbProps {
  size?: number;
  blur?: string;
  delay?: number;
  offset?: { x: number; y: number };
}
export default function MouseFollowOrb({
  size = 288, // 72 * 4 = 288px (w-72 = 18rem = 288px)
  blur = "blur-3xl",
//   delay = 0.15,
  offset = { x: -100, y: -100 }, // Center the orb on cursor
}: MouseFollowOrbProps) {
  const mousePosition = useMousePosition();

  return (
    <div
      className={`pointer-events-none fixed bg-linear-to-r from-blue-700 to-black dark:from-gray-300 dark:to-blue-800 rounded-full ${blur} animate-pulse z-0`}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        left: `${mousePosition.x + offset.x}px`,
        top: `${mousePosition.y + offset.y}px`,
        // transition: `left ${delay}s ease-out, top ${delay}s ease-out`,
      }}
    />
  );
}
