import { useState } from "react";
import { ArrowLeft, MoreHorizontal } from "react-feather";
import { Link } from "react-router-dom";
import { routesPaths } from "../../config/routesPaths.config";
import { useGetCategories } from "../../hooks/useGetCategories";
import CategoriesModal from "../CategoriesModal";

type PostNavigationProps = {
  onGoBack?: () => void;
};

const PostNavigation = ({ onGoBack }: PostNavigationProps) => {
  const [isCategoriesModalOpen, setIsCategoriesModalOpen] = useState(false);
  const { categories } = useGetCategories();

  return (
    <div className="bg-zinc-700 p-3 flex justify-between items-center">
      <Link to={routesPaths.root()}>
        <a
          className="text-gray-400 text-sm flex items-center"
          aria-label="Home"
        >
          <ArrowLeft className="mr-3" />
          <span>Back</span>
        </a>
      </Link>
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setIsCategoriesModalOpen(true)}
      >
        <MoreHorizontal size={16} className="text-gray-400" />
        <span className="text-gray-400 text-xs">Categories</span>
      </div>
      {isCategoriesModalOpen && categories ? (
        <CategoriesModal
          categories={categories}
          onClose={() => setIsCategoriesModalOpen(false)}
        />
      ) : null}
    </div>
  );
};

export default PostNavigation;
