import router from "../Router";

export const getRoutes = () => {
  return router.routes[0].children.map((route) => ({
    path: route.path,
    children: route.children || [],
  }));
};
