import UserItem from './UserItem/UserItem'
import st from './Users.module.css'
import React, { FC, useEffect } from 'react'
import UsersSearchForm from './UsersSearchForm/UsersSearchForm'
import { FilterType, follow, requestUsers, unfollow } from '../../redux/users-reducer'
import Preloader from '../../components/common/Preloader/Preloader'
import { useDispatch, useSelector } from 'react-redux'
import {
  getCurrentPage,
  getIsFetching,
  getIsFollowingInProgress,
  getPageSize,
  getTotalUsersCount,
  getUsers,
  getUsersFilter,
} from '../../redux/users-selectors'
import { useHistory } from 'react-router-dom'
import * as queryString from 'querystring'
import { Pagination } from 'antd'

type Props = {}

type QueryType = { term?: string; page?: string; friend?: string }

const Users: FC<Props> = props => {
  const users = useSelector(getUsers)
  const totalUsersCount = useSelector(getTotalUsersCount)
  const currentPage = useSelector(getCurrentPage)
  const pageSize = useSelector(getPageSize)
  const filter = useSelector(getUsersFilter)
  const followingInProgress = useSelector(getIsFollowingInProgress)
  const isFetching = useSelector(getIsFetching)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryType

    let actualPage = currentPage
    if (parsed.page) actualPage = Number(parsed.page)

    let actualFilter = filter
    if (parsed.term) actualFilter = { ...actualFilter, term: parsed.term as string }
    if (parsed.friend)
      actualFilter = {
        ...actualFilter,
        friend: parsed.friend === 'null' ? null : parsed.friend === 'true' ? true : false,
      }

    dispatch(requestUsers(actualPage, pageSize, actualFilter))
  }, [])

  useEffect(() => {
    const query: QueryType = {}

    if (filter.term) query.term = filter.term
    if (filter.friend !== null) query.friend = String(filter.friend)
    if (currentPage !== 1) query.page = String(currentPage)

    history.push({
      pathname: '/users',
      search: queryString.stringify(query),
    })
  }, [filter, currentPage])

  const onPageSelector = (pageNumber: number) => {
    dispatch(requestUsers(pageNumber, pageSize, filter))
  }
  const onFilterChanged = (filter: FilterType) => {
    dispatch(requestUsers(1, pageSize, filter))
  }

  const onFollow = (userId: number) => {
    dispatch(follow(userId))
  }

  const onUnfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

  const usersElements = users.map(u => (
    <UserItem user={u} key={u.id} followingInProgress={followingInProgress} follow={onFollow} unfollow={onUnfollow} />
  ))

  return (
    <div className={st.usersPage}>
      <UsersSearchForm filter={filter} onFilterChanged={onFilterChanged} />
      <div className={st.paginator}>
        <Pagination
          showQuickJumper
          showSizeChanger={false}
          defaultCurrent={1}
          current={currentPage}
          total={totalUsersCount}
          onChange={onPageSelector}
          pageSize={pageSize}
        />
      </div>
      <div>
        {isFetching ? <Preloader /> : null}
        {usersElements}
      </div>
      <div className={st.paginator}>
        <Pagination
          showQuickJumper
          showSizeChanger={false}
          defaultCurrent={1}
          current={currentPage}
          total={totalUsersCount}
          onChange={onPageSelector}
          pageSize={pageSize}
        />
      </div>
    </div>
  )
}
export default Users
