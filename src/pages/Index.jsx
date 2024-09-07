import {lazy, Suspense, useEffect} from "react";
import smallPrize from '../img/prizes-small-1.svg'
import smallPrize2 from '../img/prizes-small-2.svg'
import MainHeader from "../components/Header/MainHeader.jsx";
import Hero from "./Index/Hero.jsx";
import Rules from "./Index/Rules.jsx";
import Songs from "./Index/Songs.jsx";
import Winners from "./Index/Winners.jsx";
import FAQ from "./Index/FAQ.jsx";
import Join from "./Index/Join.jsx";
import Login from "./Index/Login.jsx";
import Footer from "../components/Footer/Footer.jsx";
import {Helmet} from "react-helmet";

const Styling = lazy(() => import('../css/LoginAndBaseStyles.jsx'))
export default function Index() {
    useEffect(() => {
        document.body.classList.forEach(item => document.body.classList.remove(item))
        document.body.classList.add('body-main')

        const anchorLinks = document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();

                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop,
                        behavior: 'smooth',
                    });
                }
            });
        });
    }, [])

    return(
        <>
            <Helmet>
                <link
                    rel="stylesheet"
                    href="https://unpkg.com/accordion-js@3.3.4/dist/accordion.min.css"
                />
            </Helmet>
            <Suspense fallback={<>...</>}>
                <Styling>
                    <main>
                        <Hero/>
                        <div className="prizes">
                            <div className="container">
                                <div id="prizes" className="prizes__title">
                                    Призы победителей конкурса
                                </div>
                                <div className="prizes__flex">
                                    <div className="prizes__right-block">
                                        <div className="prizes__right-img">
                                            <img src={smallPrize} alt=""/>
                                        </div>
                                        <div className="prizes__left-text">
                                            <div className="prizes__subtitle">
                                                Вытупление на премии «СуперЛайкШоу-2024»
                                            </div>
                                            <p>
                                                Победители исполнят трек детского мира и выступят
                                                с ним на розовой дорожке Музыкальной Премии СТС Kids х Kids
                                                Project
                                            </p>
                                        </div>
                                    </div>
                                    <div className="prizes__right-block">
                                        <div className="prizes__right-img">
                                            <img src={smallPrize2} alt=""/>
                                        </div>
                                        <div className="prizes__left-text">
                                            <div className="prizes__subtitle">Подарочный сертификат</div>
                                            <p>
                                                Каждый победитель получит подарочный сертификат на запись
                                                своей песни в профессиональной студии звукозаписи
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Rules/>
                        <Songs/>
                        <Winners/>
                        <FAQ/>
                        <Join/>
                        <Login/>
                    </main>
                </Styling>
            </Suspense>
            <MainHeader/>


            <Footer/>
        </>
    )
}
