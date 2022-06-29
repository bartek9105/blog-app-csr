import { useMutation, useQuery } from "react-query";
import { Link } from "react-router-dom";
import {
  getCategories,
  getPopularCategories,
} from "../../api/categories/categories.api";
import { getPosts, savePost } from "../../api/posts/posts.api";
import CategoriesList from "../../components/CategoriesList";
import CategoryCard from "../../components/CategoryCard";
import Layout from "../../components/Layout";
import PopularPost from "../../components/PopularPost";
import PostsList from "../../components/PostsList";
import Spinner from "../../components/Spinner";
import supabase from "../../config/supabase.config";
import { Post } from "../../types/Post.type";

const postsQueryKey = "postsQueryKey";
const categoriesQueryKey = "categoriesQueryKey";

const Home = () => {
  const user = supabase.auth.user();

  const { data: categories, isLoading: isCategoriesLoading } = useQuery(
    categoriesQueryKey,
    getCategories
  );
  const { data: posts, isLoading: isPostsLoading } = useQuery(
    postsQueryKey,
    getPosts
  );

  const { mutateAsync: handleSavePost } = useMutation(
    "savePostQuery",
    (data: any) => savePost(data)
  );

  const popularPosts = posts
    ?.filter((post: Post) => post?.comments?.length)
    .sort((a: any, b: any) => b.comments.length - a.comments.length)
    .splice(0, 6);

  const { data: popularCategories } = useQuery(
    "popularCategoriesQueryKey",
    getPopularCategories
  );

  return (
    <>
      <Layout displayPostNavigation={false}>
        <div className="mb-6 lg:max-w-7xl mx-auto">
          {isCategoriesLoading ? (
            <Spinner />
          ) : (
            <CategoriesList categories={categories} />
          )}
        </div>
        <div className="md:flex md:gap-16 lg:max-w-7xl mx-auto">
          <div className="w-1/1 md:w-3/5">
            <div>{isPostsLoading ? <Spinner /> : null}</div>
            {posts ? (
              <div>
                <PostsList
                  onSave={(id: any) =>
                    handleSavePost({
                      post: id,
                      user: user?.id,
                    })
                  }
                  posts={posts}
                />
              </div>
            ) : null}
          </div>
          <div className="text-white hidden sm:hidden md:block">
            <div className="mb-8">
              <h6 className="text-gray-400 text-xs tracking-wider font-bold mb-6">
                Popular categories
              </h6>
              <ul className="flex flex-wrap gap-4">
                {popularCategories?.map(({ id, name, img_url }) => (
                  <li key={id} className="cursor-pointer">
                    <Link to={`/category/${id}`}>
                      <CategoryCard name={name} img_url={img_url} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <h6 className="text-gray-400 text-xs tracking-wider font-bold mb-6">
              Hot posts
            </h6>
            <ul className="flex flex-col gap-4">
              {popularPosts?.map(({ id, title, img_url }: Post) => (
                <li key={id} className="cursor-pointer">
                  <Link to={`/post/${id}`}>
                    <PopularPost title={title} img_url={img_url} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Home;
