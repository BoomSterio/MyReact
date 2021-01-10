import Preloader from "../components/common/Preloader/Preloader";
import React from "react";

export function withSuspence <WCP>(WrappedComponent: React.ComponentType<WCP>) {
    return (props: WCP) => {
        return (
            <React.Suspense fallback={<Preloader/>}>
                <WrappedComponent {...props}/>
            </React.Suspense>
        )
    }
}