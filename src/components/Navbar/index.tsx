import Button from "../Button";
import { Bookmark, LogIn, Search } from "react-feather";
import Logo from "../Logo";
import supabase from "../../config/supabase.config";
import { Edit } from "react-feather";
import UserDropdown from "../UserDropdown";
import { useState } from "react";
import { signOut } from "../../api/auth/auth.api";
import { toast } from "react-toastify";
import { routesPaths } from "../../config/routesPaths.config";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = supabase.auth.user();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSignOut = () => {
    signOut();
    toast.success("Successfuly logged out");
  };

  const navigate = useNavigate();

  return (
    <nav className="text-gray-300 flex justify-between items-center p-4 bg-zinc-800">
      <Logo onClick={() => navigate(routesPaths.root(), { replace: true })} />
      <div className="flex items-center gap-4">
        <Link to={routesPaths.search()}>
          <a aria-label="Search posts">
            <Search />
          </a>
        </Link>
        {user ? (
          <div className="flex items-center gap-4">
            <Link to={routesPaths.saved()}>
              <a aria-label="Save post">
                <Bookmark />
              </a>
            </Link>
            <span
              className="cursor-pointer relative flex items-center gap-1 text-yellow-400 font-bold text-sm"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {user.user_metadata.name}
              {isDropdownOpen ? (
                <div className="absolute top-8 -left-4">
                  <UserDropdown onLogout={() => handleSignOut()} />
                </div>
              ) : null}
            </span>
            <Link to={routesPaths.post.new()}>
              <a aria-label="Create new post">
                <Button variant="primary">
                  <Edit size={16} />
                </Button>
              </a>
            </Link>
          </div>
        ) : (
          <Link to={routesPaths.login()}>
            <a aria-label="Login">
              <Button variant="primary">
                <LogIn />
                Login
              </Button>
            </a>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
