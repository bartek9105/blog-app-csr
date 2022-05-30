import { useMutation } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signInWithEmail } from "../../api/auth/auth.api";
import AuthLayout from "../../components/AuthLayout";
import LoginForm, { LoginFormValues } from "../../components/LoginForm";
import { routes } from "../../config/routes.config";
import { routesPaths } from "../../config/routesPaths.config";

const title = "Login";
const hint = "Welcome back. Login to your account.";

const LoginPage = () => {
  const navigate = useNavigate();
  const { mutateAsync: signIn, isLoading } = useMutation(
    "signInMutationKey",
    (data: LoginFormValues) => signInWithEmail(data),
    {
      onSuccess: () => {
        navigate(routesPaths.root(), { replace: true });
        toast.success("Successfuly logged in");
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
          <LoginForm onSubmit={(values: LoginFormValues) => signIn(values)} />
        )}
      >
        <span className="block text-sm text-gray-400 mb-12 flex justify-between mt-12">
          Dont have an account?
          <span className="text-yellow-400">
            <Link to={routesPaths.signup()}>Sign Up</Link>
          </span>
        </span>
      </AuthLayout>
    </>
  );
};

export default LoginPage;
