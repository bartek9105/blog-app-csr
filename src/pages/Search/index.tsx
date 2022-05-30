import { useState } from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { searchPosts } from "../../api/posts/posts.api";
import Layout from "../../components/Layout";
import PostSearchResult from "../../components/PostSearchResult";
import SearchPostsForm, {
  SearchPostsFormValues,
} from "../../components/SearchPostsForm";
import Spinner from "../../components/Spinner";

const searchQueryKey = "searchQueryKey";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: posts,
    mutateAsync: handleSearchPosts,
    isLoading,
  } = useMutation(searchQueryKey, (data: SearchPostsFormValues) =>
    searchPosts(data)
  );

  return (
    <>
      <Layout className="lg:max-w-4xl mx-auto">
        <SearchPostsForm
          onSubmit={(values) => {
            handleSearchPosts(values);
            setSearchQuery(values.query);
          }}
        />
        {!isLoading ? (
          <div>
            {searchQuery ? (
              <h2 className="mt-8">
                {posts?.length} Results found for{" "}
                <span className="text-gray-400">{searchQuery}</span>
              </h2>
            ) : null}
            {posts ? (
              <ul className="grid gap-6 mt-8">
                {posts?.map((post) => (
                  <Link to={`/post/${post.id}`} key={post.id}>
                    <li key={post.id}>
                      <PostSearchResult post={post} />
                    </li>
                  </Link>
                ))}
              </ul>
            ) : null}
          </div>
        ) : (
          <Spinner />
        )}
      </Layout>
    </>
  );
};

export default Search;
