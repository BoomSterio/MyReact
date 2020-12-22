import st from "./IconLink.module.css";
import github from "../../../assets/images/github.png";
import vk from "../../../assets/images/vk.png";
import youtube from "../../../assets/images/youtube.png"
import twitter from "../../../assets/images/twitter.png"
import facebook from "../../../assets/images/facebook.png"
import instagram from "../../../assets/images/instagram.png"
import website from "../../../assets/images/website.png"
import mainLink from "../../../assets/images/mainLink.png"
import {Link} from "react-router-dom";

const IconLink = ({type, link}) => {
    if (link === null || link === "") {
        return ""
    }

    function getIconLink(icon) {
        function onLinkClick() {
            debugger
            if(!link.startsWith("https://") && !link.startsWith("www")) {
                link = "https://" + link;
            }
            window.location=link;
        }
        return <Link onClick={onLinkClick} title={link} className={st.linkBtn}><img src={icon} alt={"iconLink"}/></Link>
    }

    switch (type) {
        case "github": {
            return getIconLink(github)
        }
        case "youtube": {
            return getIconLink(youtube)
        }
        case "facebook": {
            return getIconLink(facebook)
        }
        case "instagram": {
            return getIconLink(instagram)
        }
        case "mainLink": {
            return getIconLink(mainLink)
        }
        case "vk": {
            return getIconLink(vk)
        }
        case "twitter": {
            return getIconLink(twitter)
        }
        case "website": {
            return getIconLink(website)
        }
        default: {
            return link;
        }
    }
}

export default IconLink;