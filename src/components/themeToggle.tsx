import { useTheme } from "@/contexts/ThemeContext";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 p-3 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-lg border border-gray-300 dark:border-white/20 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 z-50"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <Moon className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      ) : (
        <Sun className="w-6 h-6 text-gray-800 dark:text-gray-200" />
      )}
    </button>
  );
}
