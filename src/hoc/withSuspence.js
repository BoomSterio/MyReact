import Preloader from "../components/common/Preloader/Preloader";
import React from "react";

export const withSuspence = (Component) => {
    return (props) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <Component {...props}/>
            </React.Suspense>
        )
    }
}