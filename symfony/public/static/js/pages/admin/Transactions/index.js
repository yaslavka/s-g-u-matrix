import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Link, generatePath } from 'react-router-dom';
import { Row, Col, Container } from 'reactstrap';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';
import isNull from 'lodash-es/isNull';
import Select from 'react-select';
import { formatter } from 'utils';

import r from 'constants/routes.constants';
import { STATE_OPTIONS, TRANSACTION_TYPE } from './constants';
import * as actions from 'actions/transactions.actions';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import { getAccessToken } from 'utils';

const Transactions = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.transactions.list);
  const isLoading = useSelector(state => state.transactions.loadings.getAll);
  const { total, page } = useSelector(state => state.transactions.meta);
  const { limit } = useSelector(state => state.transactions.query);

  useEffect(() => {
    dispatch(actions.getTransactions());
  }, [dispatch]);

  const handleOnChangePage = useCallback(
    page => dispatch(actions.setTransactionsPage(page)),
    [dispatch],
  );

  const handleOnChangeUser = useCallback(
    option => dispatch(actions.setTransactionsUser(option?.id || null)),
    [dispatch],
  );

  const handleOnChangeState = useCallback(
    option =>
      dispatch(
        actions.setTransactionsState(isNull(option) ? null : option?.value),
      ),
    [dispatch],
  );

  const handleOnChangeType = useCallback(
    option =>
      dispatch(
        actions.setTransactionsType(isNull(option) ? null : option?.value),
      ),
    [dispatch],
  );

  const loadOptions = async (searchQuery, loadedOptions, { page, limit }) => {
    if (searchQuery) {
      const offset = page * limit;
      const token = getAccessToken();
      const url = `${process.env.REACT_APP_BASE_URL}/api-admin/user/find-by-name?name=${searchQuery}&offset=${offset}&limit=${limit}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const responseJSON = await response.json();
      return {
        options: responseJSON.items,
        hasMore: (page + 1) * limit <= responseJSON.count,
        additional: { page: page + 1, limit },
      };
    } else {
      return {
        options: [],
        hasMore: false,
        additional: { page: 0, limit },
      };
    }
  };

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <h1 className="root-page-title">Транзакции</h1>
          <Row className="mb-4">
            <Col lg={4}>
              <AsyncPaginate
                debounceTimeout={300}
                placeholder="Поиск по логину"
                getOptionValue={option => option.id}
                getOptionLabel={option => option.username}
                loadOptions={loadOptions}
                onChange={handleOnChangeUser}
                additional={{ page: 0, limit: 10 }}
                isClearable
                styles={{
                  menu: provided => ({
                    ...provided,
                    color: '#2a0072',
                  }),
                }}
              />
            </Col>
            <Col lg={4}>
              <Select
                isClearable
                placeholder="Состояние"
                options={STATE_OPTIONS}
                onChange={handleOnChangeState}
                styles={{
                  menu: provided => ({
                    ...provided,
                    color: '#2a0072',
                  }),
                }}
              />
            </Col>
            <Col lg={4}>
              <Select
                isClearable
                placeholder="Тип"
                options={TRANSACTION_TYPE}
                onChange={handleOnChangeType}
                styles={{
                  menu: provided => ({
                    ...provided,
                    color: '#2a0072',
                  }),
                }}
              />
            </Col>
          </Row>
          <Spinner isLoading={isLoading}>
            <Row>
              {!isEmpty(list) ? (
                list.map(
                  ({ id, username, amount, dateCreate, state, type }) => (
                    <Col key={id} lg={6}>
                      <div className="card">
                        <div className="card__header">
                          <div className="card__header-left">
                            <h3 className="card__title">
                              <Link
                                className="team__user"
                                to={generatePath(r.transactionsEdit, { id })}
                              >
                                {username}
                              </Link>
                            </h3>
                          </div>
                          <div className="card__header-right">&nbsp;</div>
                        </div>
                        <div className="card__body">
                          <div className="list-info list-info--horizontal">
                            <div className="list-info__group">
                              <div className="list-info__label">Логин:</div>
                              <div className="list-info__value">{username}</div>
                            </div>
                            <div className="list-info__group">
                              <div className="list-info__label">
                                Дата создания:
                              </div>
                              <div className="list-info__value text-right">
                                {dateCreate}
                              </div>
                            </div>
                            <div className="list-info__group">
                              <div className="list-info__label">Состояние:</div>
                              <div className="list-info__value">
                                {STATE_OPTIONS.find(st => st.value === state)
                                  ?.label || '-'}
                              </div>
                            </div>
                            <div className="list-info__group">
                              <div className="list-info__label">Тип:</div>
                              <div className="list-info__value">
                                {TRANSACTION_TYPE.find(st => st.value === type)
                                  ?.label || '-'}
                              </div>
                            </div>
                            <div className="list-info__group">
                              <div className="list-info__label">Сумма:</div>
                              <div className="list-info__value">
                                {formatter.format(amount).replace('₽', 'ST')}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ),
                )
              ) : (
                <Col>
                  <h4 className="text-center mb-4 mt-4">
                    Транзакции отсутствуют
                  </h4>
                </Col>
              )}
            </Row>
            {!isEmpty(list) && !isLoading && (
              <ReactPaginate
                forcePage={page}
                marginPagesDisplayed={1}
                activeClassName="active"
                pageCount={Math.ceil(total / limit)}
                onPageChange={props => handleOnChangePage(props.selected)}
                containerClassName="pagination"
                previousLabel={
                  <img src={arrowLeft} className="arrowLeft" alt="Arrow left" />
                }
                nextLabel={
                  <img
                    src={arrowRight}
                    className="arrowRight"
                    alt="Arrow right"
                  />
                }
              />
            )}
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default Transactions;
