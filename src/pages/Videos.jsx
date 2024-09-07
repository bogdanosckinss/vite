import {useEffect} from "react";
import '../css/styles.css'
import '../css/videos/videos.css'
import Header from "../components/Header/Header.jsx";
import NotFound from "../components/NotFound/NotFound.jsx";
import VideosResult from "../components/VideosResult/VideosResult.jsx";
import Footer from "../components/Footer/Footer.jsx";
import {useSelector} from "react-redux";

export default function Videos() {
    const { searchOptions, query, loading, hideNotFoundNote } = useSelector((state) => state.posts)

    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('videos-body')
    }, []);

    return (
        <>
            <main className="videos-main-block-cover">
                <Header/>
                <div className='videos-cover-main'>
                    { searchOptions.length == 0 && query != '' && !loading && !hideNotFoundNote ? <NotFound query={query}/> : '' }
                    <VideosResult/>
                </div>
            </main>
            <Footer />
        </>
    )
}
