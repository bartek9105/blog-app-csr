import { useQuery } from "react-query";
import { getPostsByCategory } from "../../api/posts/posts.api";
import PostsList from "../../components/PostsList";
import Spinner from "../../components/Spinner";
import { useGetCategories } from "../../hooks/useGetCategories";
import Layout from "../../components/Layout";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { id } = useParams();

  const categoryId = Number(id);

  const { categories, isCategoriesLoading } = useGetCategories();

  const currentCategory = categories?.find(({ id }) => id === categoryId);

  const { data: posts, isLoading: isPostsLoading } = useQuery(
    ["posts", categoryId],
    async () => {
      return getPostsByCategory(currentCategory?.id);
    }
  );

  return (
    <>
      <Layout className="lg:max-w-5xl mx-auto">
        <div className="relative w-1/1 flex items-center justify-center">
          {currentCategory && !isCategoriesLoading ? (
            <>
              <img
                alt={currentCategory.name}
                src={currentCategory.img_url}
                className="opacity-50 h-64 object-cover"
              />
              <span className="absolute text-gray-200 text-2xl z-10">
                {currentCategory.name}
              </span>
            </>
          ) : (
            <Spinner />
          )}
        </div>
        <div className="pb-4">
          {isPostsLoading ? (
            <Spinner />
          ) : (
            <div className="mt-6">
              {posts ? <PostsList posts={posts} /> : null}
            </div>
          )}
        </div>
        {posts?.length === 0 ? (
          <h3 className="text-gray-500 text-center">
            No posts found for this category
          </h3>
        ) : null}
      </Layout>
    </>
  );
};

export default CategoryPage;
