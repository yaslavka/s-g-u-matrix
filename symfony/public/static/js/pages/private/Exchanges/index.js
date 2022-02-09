import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
import ExchangeCreateModal from 'components/Modals/Exchanges/ExchangeCreate';
import ExchangeBuyModal from 'components/Modals/Exchanges/ExchangeBuy';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import useQuery from 'hooks/useQuery';

import * as actions from 'actions/exchanges.actions';
import ExchangeFilter from './ExchangeFilter';
import ExchangeList from './ExchangeList';

const Exchanges = () => {
  const query = useQuery();
  const dispatch = useDispatch();

  useEffect(() => {
    const queryPlanet = query.get('planet');
    if (queryPlanet) {
      const planet = JSON.parse(queryPlanet);
      dispatch(actions.toggleExchangeBuyModal(true, planet));
    }
  }, [query, dispatch]);

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <h1 className="root-page-title">Биржа</h1>
          <ExchangeFilter />
          <ExchangeList />
          <ExchangeCreateModal />
          <ExchangeBuyModal />
        </Col>
      </Row>
    </Container>
  );
};

export default Exchanges;
