import React, { useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import isEmpty from 'lodash-es/isEmpty';
import { Row, Col } from 'reactstrap';

import * as actions from 'actions/exchanges.actions';
import arrowRight from 'static/icons/angle-right.svg';
import arrowLeft from 'static/icons/angle-left.svg';
import Spinner from 'components/Spinner';

import ExchangeListElement from './ExchangeListElement';

const ExchangeList = () => {
  const dispatch = useDispatch();
  const list = useSelector(state => state.exchanges.list);
  const isLoading = useSelector(state => state.exchanges.loadings.all);
  const { total, page } = useSelector(state => state.exchanges.meta);
  const { limit } = useSelector(state => state.exchanges.query);

  useEffect(() => {
    dispatch(actions.getExchanges());
  }, [dispatch]);

  const handleOnChangePage = useCallback(
    page => dispatch(actions.setExchangesPage(page)),
    [dispatch],
  );
  return (
    <Spinner isLoading={isLoading}>
      <Row>
        {!isEmpty(list) ? (
          list.map(planet => (
            <Col key={planet.id} lg={4}>
              <ExchangeListElement planet={planet} />
            </Col>
          ))
        ) : (
          <Col>
            <h4 className="text-center mb-4 mt-4">Планеты отсутствуют</h4>
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
            <img src={arrowRight} className="arrowRight" alt="Arrow right" />
          }
        />
      )}
    </Spinner>
  );
};

export default ExchangeList;
