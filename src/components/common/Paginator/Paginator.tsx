import st from './Paginator.module.css'
import React from 'react'
import classNames from 'classnames'

type Props = {
  currentPage: number
  totalItemsCount: number
  pageSize: number
  onPageSelector: (pageNumber: number) => void
}

const Paginator: React.FC<Props> = ({ currentPage = 1, pageSize = 10, ...props }) => {
  let pagesCount = Math.ceil(props.totalItemsCount / pageSize)
  let pages: Array<number> = []

  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  const setPaginationBtnClasses = (p: number, firstButton: boolean, lastButton: boolean) => {
    return classNames({
      [st.selectedPage]: now === p,
      [st.unselectedPage]: firstButton,
      [st.unselectedPage]: lastButton,
    })
  }

  let now = currentPage

  return (
    <div className={st.paginator}>
      {pages.map(p => {
        if ((p < now + 3 && p > now - 3) || p === 1 || p === pages.length) {
          return (
            <div
              key={p}
              className={setPaginationBtnClasses(p, now > p + 3, p === pages.length && now < p - 4)}
              onClick={() => {
                props.onPageSelector(p)
              }}
            >
              {p}
            </div>
          )
        } else return ''
      })}
    </div>
  )
}

export default React.memo(Paginator)
