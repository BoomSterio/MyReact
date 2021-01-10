import loading from "../../../assets/images/loading.svg";
import st from "./Preloader.module.css"

const Preloader = () => {
    return <div className={st.preloader}><img src={loading} alt="loading"/></div>
}

export default Preloader;