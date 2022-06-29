import { capitalize } from "lodash";

type CategoryHintProps = {
  imgUrl: string;
  categoryName: string;
};

const CategoryHint = ({ imgUrl, categoryName }: CategoryHintProps) => {
  const categoryNameFormat = capitalize(categoryName);

  return (
    <div className="flex items-center">
      <img src={imgUrl} alt={categoryName} className="rounded w-8 h-8" />
      <span className="flex text-white text-xs font-bold ml-3">
        {categoryNameFormat}
      </span>
    </div>
  );
};

export default CategoryHint;
