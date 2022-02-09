import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Button } from 'reactstrap';
import confirm from 'reactstrap-confirm';
import { toast } from 'react-toastify';
import { formatter } from 'utils';

import r from 'constants/routes.constants';
import * as actions from 'actions/exchanges.actions';
import avatarFallback from 'static/images/placeholder.svg';
import planetImage from 'static/images/home/planet-3.png';
import Icon from 'components/Icon';

const ExchangeListElement = ({ planet }) => {
  const {
    id,
    planetId,
    price,
    avatar,
    private: needPassword,
    comets,
    sellerUsername,
    sellerId,
  } = planet;
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  const isLoadingCancel = useSelector(state => state.exchanges.loadings.cancel);
  const isLoadingBuy = useSelector(state => state.exchanges.loadings.buy);
  const { active } = useSelector(state => state.exchanges.query);

  const handleOnExchangeCancel = useCallback(async () => {
    let result = await confirm({
      title: `Отмена продажи планеты #${planetId}`,
      message: `Вы хотите отменить продажу планеты #${planetId}?`,
      confirmText: 'Подтвердить',
      confirmColor: 'primary',
      cancelText: 'Отмена',
      cancelColor: 'link text-muted',
    });

    if (result) {
      dispatch(actions.exchangeCancel({ id }));
    }
  }, [dispatch, id, planetId]);

  const handleOnExchangeBuy = useCallback(
    () => dispatch(actions.toggleExchangeBuyModal(true, planet)),
    [dispatch, planet],
  );

  const handleExchangeCopy = useCallback(() => {
    if (planet) {
      const { id, planetId, private: isPrivate, comets, price } = planet;
      const link = `${window.location.origin}${
        r.exchanges
      }?planet=${JSON.stringify({
        id,
        planetId,
        private: isPrivate,
        comets,
        price,
      })}`;
      navigator.clipboard.writeText(link).then(() => {
        toast.info('Ссылка успешно скопирована');
      });
    }
  }, [planet]);

  return (
    <div className="exchanges-planet">
      <div className="exchanges-planet__header">
        <figure>
          <div
            className="exchanges-planet__picture"
            style={{ backgroundImage: `url(${planetImage})` }}
          />
          <figcaption>{needPassword && <Icon iconName="keys" />}</figcaption>
        </figure>
        <div className="exchanges-planet__info">
          <div>#{planetId}</div>
          <small>Номер планеты</small>
        </div>
      </div>
      <div className="exchanges-planet__body">
        <ul>
          <li>
            <div>
              Текущий баланс <br />
              <small>(комет)</small>
            </div>
            <div className="--count --count-comets">{comets}</div>
          </li>
          <li>
            <div>Цена планеты</div>
            <div className="--count --count-price">
              {formatter.format(price).replace('₽', 'ST')}
            </div>
          </li>
        </ul>
        <div className="exchanges-planet-seller">
          <div
            className="exchanges-planet-seller__avatar"
            style={{
              backgroundImage: `url(${
                avatar
                  ? `${process.env.REACT_APP_BASE_URL}/getFile/avatar/${avatar}`
                  : avatarFallback
              })`,
            }}
          />
          <div className="exchanges-planet-seller__info">
            <small>Продавец</small>
            {sellerUsername}
          </div>
        </div>
      </div>
      {active && (
        <div className="exchanges-planet__footer">
          <Row>
            <Col>
              {sellerId === userInfo?.id ? (
                <Button
                  color="danger"
                  disabled={isLoadingCancel}
                  onClick={handleOnExchangeCancel}
                  outline
                  block
                >
                  Отменить
                </Button>
              ) : (
                <Button
                  disabled={isLoadingBuy}
                  onClick={handleOnExchangeBuy}
                  color="primary"
                  block
                >
                  Купить
                </Button>
              )}
            </Col>
            <Col sm={3}>
              <Button
                onClick={handleExchangeCopy}
                color="primary"
                outline
                block
              >
                <Icon iconName="copy" />
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
};

export default ExchangeListElement;
