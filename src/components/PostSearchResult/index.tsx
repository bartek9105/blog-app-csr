import { Post } from "../../types/Post.type";

type PostSearchResultProps = {
  post: Post;
};

const PostSearchResult = ({
  post: { title, img_url, categories },
}: PostSearchResultProps) => {
  return (
    <article className="flex text-white gap-4 bg-zinc-700 p-4 rounded-lg">
      <img src={img_url} alt={title} className="rounded object-fit w-16 h-16" />
      <div className="flex flex-col justify-between text-sm">
        <span className="text-gray-400">{categories.name}</span>
        <h4>{title}</h4>
      </div>
    </article>
  );
};

export default PostSearchResult;
