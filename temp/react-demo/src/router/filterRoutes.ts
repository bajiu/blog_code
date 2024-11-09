const filterRoutes = (routes: any[], userRole: any) => {
    // 根据用户角色过滤路由
    return routes.filter(route => {
        if (route.roles && !route.roles.includes(userRole)) {
            return false; // 当前用户无权限访问
        }
        if (route.children) {
            route.children = filterRoutes(route.children, userRole); // 递归过滤子路由
        }
        return true;
    });
};

export default filterRoutes;