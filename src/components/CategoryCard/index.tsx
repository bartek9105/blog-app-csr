import { Category } from "../../types/Category.type";

type CategoryCardProps = Omit<Category, "id">;

const CategoryCard = ({ name, img_url }: CategoryCardProps) => {
  return (
    <div className="ease-in-out duration-200 flex flex-col gap-4 justify-center items-center p-4 rounded bg-zinc-800 hover:bg-zinc-700">
      <img src={img_url} alt={name} className="rounded w-8 h-8" />
      <span className="text-gray-300 text-sm">{name}</span>
    </div>
  );
};

export default CategoryCard;
