import React, { useState } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "firebase/auth";
import { auth } from "@/firebase";
import { useNavigate } from "react-router-dom";
import { IoIosLogOut } from "react-icons/io";
import { HelpCircle } from "lucide-react";

const UserMenu = ({
  name,
  email,
  image,
}: {
  name: string;
  email: string;
  image: string;
}) => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/auth");
  };

  return (
    <div className="flex items-center justify-center sm:justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            className="focus:outline-none rounded-full transition-transform hover:scale-105 active:scale-95"
            aria-label="Foydalanuvchi menyusi"
          >
            <Avatar className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback className="text-sm sm:text-base">
                {name?.[0]?.toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-52 sm:w-60 rounded-xl shadow-lg p-2 bg-white dark:bg-gray-900"
          align="end"
          sideOffset={10}
        >
          {/* User info */}
          <div className="px-3 sm:px-4 py-2 sm:py-3 border-b border-gray-200 dark:border-gray-700">
            <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
              {name}
            </p>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
              {email}
            </p>
          </div>

          {/* Yordam / Savollar */}
          <DropdownMenuItem
            onClick={() =>
              window.open("https://t.me/KucharovAnvar", "_blank")
            }
            className="flex items-center justify-between text-sm sm:text-base cursor-pointer hover:bg-primary/10 dark:hover:bg-primary/20 px-3 py-2 rounded-md"
          >
            <span>Yordam / Savollar</span>
            <HelpCircle className="ml-2 w-4 h-4 sm:w-5 sm:h-5 text-primary" />
          </DropdownMenuItem>

          {/* Chiqish */}
          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center justify-between text-sm sm:text-base cursor-pointer hover:bg-red-500/10 dark:hover:bg-red-600/20 px-3 py-2 rounded-md text-red-600 dark:text-red-400"
          >
            <span>Chiqish</span>
            <IoIosLogOut className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserMenu;
