import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setSelectedVideoIndex} from "../../features/posts/postsSlice";
import playImage from "../../img/play.svg";
import heart from "../../img/heart.svg";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useInView} from "react-intersection-observer";

export default function Post({post, isLastLine, findMoreAsync}) {
    const { query } = useSelector((state) => state.posts)
    const [fetchedPost, setFetchedPost] = useState({})
    const [firstRender, setFirstRender] = useState(true)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { ref, inView } = useInView({
        threshold: 0.5,
        rootMargin: '0px',
        triggerOnce: true,
        root: document.getElementById('postlist'),
    })

    useEffect(() => {
        if (firstRender) {
            setFirstRender(value => !value)
            return
        }

        findMoreAsync()
    }, [inView])

    useEffect(() => {
        setFetchedPost(post)
    }, [post])

    function getLikes() {
        return fetchedPost?.videoLikes?.length ?? 0
    }

    function selectVideoIndex() {
        dispatch(setSelectedVideoIndex(fetchedPost?.id))

        navigate({
            pathname: '/videos-top-down',
            search: createSearchParams({
                video: fetchedPost?.id,
                query: query
            }).toString(),
        }, {replace: false})
    }

    return (
        <li ref={ref} className="videos-result__item" onClick={selectVideoIndex}>
            <video className="videos-result__video" loop>
                {fetchedPost?.link ? <source type="video/mp4" src={fetchedPost?.link}/> : '' }
            </video>
            <div className="videos-result__play">
                <a href=""> <img src={playImage} alt="img"/> </a>
            </div>
            <div className="videos-result__author">
                <div className="videos-result__author-icon">
                    {fetchedPost?.users?.image ? <img src={fetchedPost?.users?.image} alt="img"/> : ''}
                </div>
                <div className="videos-result__author-info">
              <span className="videos-result__author-nickname"
              >{fetchedPost?.users?.name}</span
              >
                    <span className="videos-result__author-city"
                    >г. <span>{fetchedPost?.users?.city}</span>, <span>{fetchedPost?.users?.age}</span> лет</span
                    >
                </div>
            </div>
            <div className="videos-result__info">
                <div className="videos-result__song-info">
                    <div className="videos-result__song-img">
                        {fetchedPost?.song?.image_link ? <img src={fetchedPost?.song?.image_link} alt="iocn"/> : '' }
                    </div>
                    <div className="videos-result__song">
                        <div className="videos-result__song-singer">{fetchedPost?.song?.author_name}</div>
                        <div className="videos-result__song-name">{fetchedPost?.song?.title}</div>
                    </div>
                </div>

                <div className="videos-result__likes">
                    <span><img src={heart} alt="icon"/></span>
                    <span>{getLikes()}</span>
                </div>
            </div>
        </li>
)
}
