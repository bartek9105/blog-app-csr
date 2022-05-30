import { useMutation, useQuery } from "react-query";
import { getCategories } from "../../api/categories/categories.api";
import { getPosts, savePost } from "../../api/posts/posts.api";
import CategoriesList from "../../components/CategoriesList";
import Layout from "../../components/Layout";
import PostsList from "../../components/PostsList";
import Spinner from "../../components/Spinner";
import supabase from "../../config/supabase.config";

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
    "somequery",
    (data: any) => savePost(data)
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
        <div className="lg:grid lg:grid-cols-2 lg:gap-4 lg:max-w-7xl mx-auto">
          <div>
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
        </div>
      </Layout>
    </>
  );
};

export default Home;
