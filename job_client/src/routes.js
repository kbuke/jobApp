import App from "./App";
import HomePg from "./HomePg/HomePg";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <HomePg />
            }
        ]
    }
]
export default routes