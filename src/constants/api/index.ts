export const url = process.env.NEXT_PUBLIC_API_URL!;

export const endpoints = {
  products: {
    get: "/products",
  },
  category: {
    get: "/categories",
  },
  auth: {
    login: "/login",
    me: "/login/me",
    logout: "/login/logout",
  },
  history: "/history",
};
