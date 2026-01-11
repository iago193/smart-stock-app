export const url = process.env.NEXT_PUBLIC_API_URL!;

export const endpoints = {
    products:"/products",
    history:"/history",
    auth: {
        login: '/login',
        me: '/login/me',
        logout: '/login/logout',
    },
}