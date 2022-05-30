import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signUpWithEmail } from "../../api/auth/auth.api";
import AuthLayout from "../../components/AuthLayout";
import SignUpForm, { SignUpFormValues } from "../../components/SignUpForm";
import { routesPaths } from "../../config/routesPaths.config";

const title = "Sign Up";
const hint = "Register your account";

const SignUpPage = () => {
  const navigate = useNavigate();

  const { mutateAsync: signUp, isLoading } = useMutation(
    "signInMutationKey",
    (data: SignUpFormValues) => signUpWithEmail(data),
    {
      onSuccess: () => {
        toast.success("Successfuly signed up");
        navigate(routesPaths.login());
      },
      onError: (error: any) => toast.error(`${error}`) as any,
    }
  );

  return (
    <>
      <AuthLayout
        isLoading={isLoading}
        title={title}
        hint={hint}
        renderForm={() => (
          <SignUpForm onSubmit={(values: SignUpFormValues) => signUp(values)} />
        )}
      >
        <span className="block text-sm text-gray-400 mb-12 flex justify-between mt-12">
          Already have an account?
          <span className="text-yellow-400">
            <Link to={routesPaths.login()}>Login</Link>
          </span>
        </span>
      </AuthLayout>
    </>
  );
};

export default SignUpPage;
