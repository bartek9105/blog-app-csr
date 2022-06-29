import { Category } from "../../types/Category.type";
import { capitalize } from "lodash";

type CategoryBadgeProps = Omit<Category, "id">;

const CategoryBadge = ({ name, img_url }: CategoryBadgeProps) => {
  const badgeName = capitalize(name);

  return (
    <div className="relative text-sm flex justify-center w-32 bg-neutral-900 text-white rounded-lg cursor-pointer h-12">
      <img src={img_url} alt={name} className="rounded object-fit opacity-50" />
      <span className="absolute font-bold z-10 px-2 py-1 rounded-lg top-2">
        {badgeName}
      </span>
    </div>
  );
};

export default CategoryBadge;
