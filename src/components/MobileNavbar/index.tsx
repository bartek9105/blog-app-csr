import { Home, Search, Bookmark } from "react-feather";
import cn from "classnames";
import { routesPaths } from "../../config/routesPaths.config";
import { Link } from "react-router-dom";

const mobileNavItems = [
  {
    renderIcon: () => <Home />,
    href: routesPaths.root(),
    ariaLabel: "Home",
  },
  {
    renderIcon: () => <Search />,
    href: routesPaths.search(),
    ariaLabel: "Search posts",
  },
  {
    renderIcon: () => <Bookmark />,
    href: routesPaths.saved(),
    ariaLabel: "Save post",
  },
];

type MobileNavbarProps = {
  className: string;
};

const MobileNavbar = ({ className }: MobileNavbarProps) => {
  return (
    <nav
      className={cn(
        "fixed left-0 right-0 bottom-0 bg-zinc-700 text-gray-400 px-12 py-4",
        className
      )}
    >
      <ul className="flex items-center justify-between">
        {mobileNavItems.map(({ renderIcon, href }, index) => (
          <Link to={href} key={index}>
            <li className="cursor-pointer">{renderIcon()}</li>
          </Link>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavbar;
