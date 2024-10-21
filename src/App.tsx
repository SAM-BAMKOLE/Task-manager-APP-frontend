import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import Root from "./layout/Root";
import { Home } from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import AuthLayout from "./layout/AuthLayout";
import Toast from "./layout/Toast";
import Tasks from "./pages/Tasks";
import { getTasks } from "./utils/handleTasks";
import { RouterProvider } from "react-router-dom";
import CreateTask from "./pages/CreateTask";
import Task from "./pages/Task";

// const RequireAuth = () => {
//     const { authenticated } = useContext(AuthContext);
//     if (!authenticated) {
//         // return redirect("/auth/signin");
//     } else {
//         return null;
//     }
// };

export const App = () => {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route element={<Toast />}>
                    <Route path="/" element={<Root />}>
                        <Route index element={<Home />} />
                        <Route path="task/" element={<Tasks />} loader={getTasks} />
                        <Route path="task/create/" element={<CreateTask />} />
                        <Route path="task/:id" element={<Task />} />
                    </Route>
                    <Route path="/auth" element={<AuthLayout />}>
                        <Route path="signup" element={<Signup />} />
                        <Route path="signin" element={<Signin />} />
                    </Route>
                </Route>
            </>
        )
    );
    return <RouterProvider router={router} />;
};
