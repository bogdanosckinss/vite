import  {useEffect} from "react";
import {Routes, Route, BrowserRouter as Router} from 'react-router-dom';
import useRefreshToken from "./hooks/useRefreshToken";
import Videos from "./pages/Videos.jsx";
import UploadSong from "./pages/Moderation/UploadSong.jsx";
import VideoModeration from "./pages/Moderation/VideoModeration.jsx";
import TopDownVideos from "./pages/TopDownVideos.jsx";
import Account from "./pages/Account.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setLoading} from "./features/auth/authSlice";
import Middleware from "./middleware/Middleware.jsx";
import Index from "./pages/Index.jsx";
import Rules from "./pages/Rules.jsx";

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
                    <Route path="/" element={<VideoModeration />} />
                </Routes>
            </Middleware>
        </Router>
    )
}

export default App
