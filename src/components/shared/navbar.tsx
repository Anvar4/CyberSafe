import { Link, useLocation } from "react-router-dom";
import { Button } from "../ui/button";
import { ModeToggle } from "./mode-toggle";
import UserMenu from "./UserMenu";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/firebase";
import { navLinks } from "../../constants";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [user, setUser] = useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <nav className="w-full border-b sticky top-0 inset-x-0 z-50 bg-background/80 backdrop-blur-md shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[10vh] flex justify-between items-center">
        {/* 🔹 Logo */}
        <Link to="/" className="flex items-center gap-1">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            Cyber<span className="text-primary">Safe</span>
          </h1>
        </Link>

        {/* 🔹 Desktop menyu */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((nav) => {
            if (nav.path !== "/" && !user) return null;

            return (
              <Link
                key={nav.path}
                to={nav.path}
                className={`font-medium transition-colors hover:text-primary ${
                  location.pathname === nav.path
                    ? "text-primary font-semibold"
                    : "text-foreground"
                }`}
              >
                {nav.label}
              </Link>
            );
          })}

          {/* Tema va foydalanuvchi */}
          <ModeToggle />
          {user ? (
            <UserMenu
              name={user.displayName || "Foydalanuvchi"}
              email={user.email || "guest@example.com"}
              image={
                user.photoURL ||
                "https://ui-avatars.com/api/?background=random&name=User"
              }
            />
          ) : (
            <Link to="/auth">
              <Button variant="secondary">Kirish</Button>
            </Link>
          )}
        </div>

        {/* 🔹 Mobil menyu tugmasi */}
        <div className="flex md:hidden items-center gap-3">
          <ModeToggle />
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* 🔹 Mobil menyu oynasi */}
      {menuOpen && (
        <div className="md:hidden bg-background border-t animate-slide-down">
          <div className="flex flex-col gap-4 p-4">
            {navLinks.map((nav) => {
              if (nav.path !== "/" && !user) return null;
              return (
                <Link
                  key={nav.path}
                  to={nav.path}
                  onClick={() => setMenuOpen(false)}
                  className={`font-medium transition-colors hover:text-primary ${
                    location.pathname === nav.path
                      ? "text-primary font-semibold"
                      : "text-foreground"
                  }`}
                >
                  {nav.label}
                </Link>
              );
            })}

            {/* 🔹 Foydalanuvchi yoki kirish tugmasi */}
            <div className="mt-2 flex items-center gap-3">
              {user ? (
                <UserMenu
                  name={user.displayName || "Foydalanuvchi"}
                  email={user.email || "guest@example.com"}
                  image={
                    user.photoURL ||
                    "https://ui-avatars.com/api/?background=random&name=User"
                  }
                />
              ) : (
                <Link to="/auth" onClick={() => setMenuOpen(false)}>
                  <Button className="w-full">Kirish</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
