import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addNewPost } from "../../api/posts/posts.api";
import Layout from "../../components/Layout";
import NewPostForm from "../../components/NewPostForm";
import { routesPaths } from "../../config/routesPaths.config";
import { useGetCategories } from "../../hooks/useGetCategories";

const NewPostPage = () => {
  const navigate = useNavigate();

  const { categories, isCategoriesLoading } = useGetCategories();
  const { mutateAsync: addNewPostMutation } = useMutation(
    "addNewPostQuery",
    (data: any) => addNewPost(data),
    {
      onSuccess: () => {
        toast.success("Post added successfuly") as any;
        navigate(routesPaths.root());
      },
    }
  );

  const getCategoryId = (categoryName: string) => {
    const category = categories?.find(({ name }) => name === categoryName);
    return category?.id as number;
  };

  const handleAddNewPost = (values: any) => {
    const categoryId = getCategoryId(values.category);
    addNewPostMutation({ ...values, category: categoryId });
  };

  return (
    <>
      <Layout className="lg:max-w-5xl mx-auto">
        <h3 className="tracking-wider mb-8 font-bold">Create New Post</h3>
        {categories && (
          <NewPostForm
            onSubmit={(values) => handleAddNewPost(values)}
            categories={categories}
          />
        )}
      </Layout>
    </>
  );
};

export default NewPostPage;
