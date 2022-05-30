import { Category } from "../../types/Category.type";

type CategoryBannerProps = {
  category: Category;
};

const CategoryBanner = ({
  category: { name, img_url },
}: CategoryBannerProps) => {
  return (
    <div>
      <div className="relative">
        <img src={img_url} alt={name} className="rounded" />
        <span className="absolute text-white top-0 left-0 px-2 py-1 rounded-lg">
          {name}
        </span>
      </div>
    </div>
  );
};

export default CategoryBanner;
