export const routesPaths = {
  root: () => "/",
  login: () => "/login",
  signup: () => "/signup",
  post: {
    new: () => "/post/new",
    details: (id: number) => `/post/${id}`,
  },
  category: (id: any) => `/category/${id}`,
  search: () => "/search",
  saved: () => "/saved",
};
