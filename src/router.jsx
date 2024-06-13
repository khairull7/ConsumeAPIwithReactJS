import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Stuff from "./pages/Stuff";
import TrashStuff from "./pages/TrashStuff";
import Inbound from "./pages/Inbound";
import User from "./pages/User";
import TrashUser from "./pages/TrashUser";
import Lending from "./pages/Lending";
import TrashLending from "./pages/TrashLending";
import InboundStuff from "./pages/InboundStuff";
// import Restoration from "./pages/Restoration";

 
export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/login', element: <Login /> },
    { path: '/profile', element: <Profile /> },
    { path: '/dashboard', element: <Dashboard />},
    { path: '/stuffs', element: <Stuff />},
    { path: '/stuffs/trash', element: <TrashStuff />},
    { path: '/inbound-stuffs/store', element: <Inbound />},
    { path: '/user', element: <User />},
    { path: '/user/trash', element: <TrashUser />},
    { path: '/lending', element: <Lending />},
    { path: '/lending/trash', element: <TrashLending />},
    { path: '/inbound-stuffs/data', element: <InboundStuff />,}
    // { path: '/restoration', element: <Restoration/>}


])