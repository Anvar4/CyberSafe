import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useTheme } from '@/hooks/use-theme'

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <div className="flex items-center justify-center sm:justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="relative flex items-center justify-center 
                       h-10 w-10 sm:h-9 sm:w-9 
                       rounded-full border border-gray-300 dark:border-gray-700 
                       hover:bg-gray-100 dark:hover:bg-gray-800 
                       transition-all active:scale-95"
          >
            {/* Quyosh ikonkasi (light mode) */}
            <Sun className="h-[1.4rem] w-[1.4rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-yellow-500" />
            {/* Oy ikonkasi (dark mode) */}
            <Moon className="absolute h-[1.4rem] w-[1.4rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          className="w-32 sm:w-36 bg-white dark:bg-gray-900 rounded-xl shadow-lg mt-2 
                     border border-gray-200 dark:border-gray-700 p-1 text-sm sm:text-base"
        >
          <DropdownMenuItem
            onClick={() => setTheme('light')}
            className="cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            ☀️ Kunduzgi
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('dark')}
            className="cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            🌙 Tungi
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setTheme('system')}
            className="cursor-pointer rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            💻 Sistema
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
