import * as React from "react";
import  {useEffect} from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import useRefreshToken from "./hooks/useRefreshToken";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "./features/auth/authSlice";
import Middleware from "./middleware/Middleware.jsx";
import Index from "./pages/Index.jsx";

const IndexPage = React.lazy(() => import('./pages/Index.jsx'))
const VideosPage = React.lazy(() => import('./pages/Videos.jsx'))
const AccountPage = React.lazy(() => import('./pages/Account.jsx'))
const TopDownVideosPage = React.lazy(() => import('./pages/TopDownVideos.jsx'))
const RulesPage = React.lazy(() => import('./pages/Rules.jsx'))
const VideoModerationPage = React.lazy(() => import('./pages/Moderation/VideoModeration.jsx'))

function App() {
    const refresh = useRefreshToken()
    const dispatch = useDispatch()
    const { loading, isAuthenticated } = useSelector((state) => state.auth)

    useEffect(() => {
        dispatch(setLoading(true))
        async function checkAuth() {
            await refresh()
        }
        checkAuth().then(() => dispatch(setLoading(false)))
    }, [])

    function AuthenticatedRouteComponent(props) {
        // if (loading) {
        //     return(
        //         <div>Loading...</div>
        //     )
        // }

        return(
            props.children
        )
    }

    return (
        <Router>
            <Middleware>
                <Routes>
                    <Route path="/video-moderation" element={
                        <React.Suspense fallback={<>...</>}>
                            <VideoModerationPage />
                        </React.Suspense>
                    } />

                    <Route path="/rules" element={
                        <React.Suspense fallback={<>...</>}>
                            <RulesPage />
                        </React.Suspense>
                    } />

                    <Route path="/video/:id" element={
                        <React.Suspense fallback={<>...</>}>
                            <TopDownVideosPage />
                        </React.Suspense>
                    } />
                    <Route path="/videos-top-down" element={
                        <React.Suspense fallback={<>...</>}>
                            <TopDownVideosPage />
                        </React.Suspense>
                    } />
                    <Route path="/account" element={
                        <React.Suspense fallback={<>...</>}>
                            <AccountPage />
                        </React.Suspense>
                    } />

                    <Route path="/videos" element={
                        <React.Suspense fallback={<>...</>}>
                            <VideosPage />
                        </React.Suspense>
                    } />

                    <Route path="/" element={
                       <Index />
                    }/>
                </Routes>
            </Middleware>
        </Router>
    )
}

export default App
