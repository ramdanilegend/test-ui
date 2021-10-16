import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import GuestGuard from "../guards/GuestGuard";
// components
import LoadingScreen from "../components/LoadingScreen";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { pathname } = useLocation();
    const isDashboard = pathname.includes("/dashboard");

    return (
        <Suspense
            fallback={
                <LoadingScreen
                    sx={{
                        ...(!isDashboard && {
                            top: 0,
                            left: 0,
                            width: 1,
                            zIndex: 9999,
                            position: "fixed",
                        }),
                    }}
                />
            }
        >
            <Component {...props} />
        </Suspense>
    );
};

export default function Router() {
    return useRoutes([
        {
            path: "/",
            element: <Navigate to="/login" replace />,
        },
        {
            path: "/login",
            element: (
                <GuestGuard>
                    <Login />
                </GuestGuard>
            ),
        },
        {
            path: "/register",
            element: (
                <GuestGuard>
                    <Register />
                </GuestGuard>
            ),
        },
        {
            path: "/home",
            element: (
                <GuestGuard>
                    <Home />
                </GuestGuard>
            ),
        },
        {
            path: "/item",
            element: (
                <GuestGuard>
                    <Item />
                </GuestGuard>
            ),
        },
        {
            path: "*",
            element: <NotFound />,
            children: [
                { path: "404", element: <NotFound /> },
                { path: "*", element: <Navigate to="/404" replace /> },
            ],
        },

        { path: "*", element: <Navigate to="/404" replace /> },
    ]);
}

// IMPORT COMPONENTS
const Login = Loadable(lazy(() => import("../pages/Login")));
const Register = Loadable(lazy(() => import("../pages/Register")));
const Home = Loadable(lazy(() => import("../pages/Home")));
const Item = Loadable(lazy(() => import("../pages/Item")));

const NotFound = Loadable(lazy(() => import("../pages/NotFound")));
