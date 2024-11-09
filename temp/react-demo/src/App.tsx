import React, {lazy, Suspense} from 'react';
import { useRoutes } from "react-router-dom";

import './App.css'
import Drag from "./pages/Drag.tsx";

const Home = lazy(() => import('./pages/Home.tsx'))
const Chat = lazy(() => import('./pages/Chat.tsx'))

const routes = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/chat',
        element: <Chat />
    },
    {
        path: '/drag',
        element: <Drag />
    },
    {
        path: '*',
        element: <div>Not Found</div>
    }
]

const App:React.FC = () => {
    const element = useRoutes(routes);
    return (
       <Suspense fallback={<div>加载中...</div>}>
           { element }
       </Suspense>
    )
}



export default App
