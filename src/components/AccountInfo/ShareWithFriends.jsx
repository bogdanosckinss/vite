import {useRef} from "react";
import CopyLink from "./CopyLink.jsx";
import ShareInSocials from "./ShareInSocials.jsx";
import TryUploadingAgain from "./TryUploadingAgain.jsx";

export default function ShareWithFriends({link, tryAgain, canShare, removeVideo}) {
    const input = useRef()

    return (
        <div className="application-approved display-mob" style={canShare || tryAgain ? {} : {display: 'none'}}>
            <div className="application-approved__title" style={canShare ? {} : {display: 'none'}}>
                Поделись ссылкой с друзьями, чтобы собрать больше голосов
            </div>
            <div className="account-share-block" style={canShare ? {} : {display: 'none'}}>
                <div className="account-share-block-left">
                    <input
                        ref={input}
                        className="account-share-block-left__input"
                        type="text"
                        value={link}
                        id="application-approved-myInput"
                    />
                    <CopyLink input={input} link={link}/>
                </div>

                <ShareInSocials/>
            </div>

            {tryAgain ?  <TryUploadingAgain removeVideo={removeVideo}/> : '' }
        </div>
    )
}
