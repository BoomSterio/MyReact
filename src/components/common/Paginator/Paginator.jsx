import st from "./Paginator.module.css";
import React from "react";
import classNames from "classnames";

const Paginator = (props) => {
    let pagesCount = Math.ceil(props.totalItemsCount / props.pageSize);
    let pages = [];

    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }

    const setPaginationBtnClasses = (p, firstButton, lastButton) => {
        return classNames({
            [st.selectedPage]: now === p,
            [st.unselectedPage]: firstButton,
            [st.unselectedPage]: lastButton
        })
    };

    let now = props.currentPage;

    return (
        <div className={st.paginator}>
            {pages.map(p => {
                if ((p < now + 3 && p > now - 3) ||
                    p === 1 || p === pages.length
                ) {
                    return <div key={p}
                                className={setPaginationBtnClasses(p, now > p + 3, p === pages.length && (now < p - 4) )}
                                onClick={() => { props.onPageSelector(p) }}
                    >{p}</div>
                } else return ""
            })}
        </div>
    )
}

export default Paginator;