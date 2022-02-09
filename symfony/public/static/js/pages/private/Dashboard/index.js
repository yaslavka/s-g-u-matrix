import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container, Button } from 'reactstrap';
import { resizeFreeInformationImage } from 'utils';
import * as htmlToImage from 'html-to-image';
import { toast } from 'react-toastify';
import { saveAs } from 'file-saver';
import Raven from 'raven-js';

import avatar from '/static/images/placeholder.svg';
import inImage from '/static/images/in-image.svg';
import vkImage from '/static/images/vk-image.svg';
import tgImage from '/static/images/tg-image.svg';

import { formatter, formatterNumber } from 'utils';
import * as actions from '/actions/app.actions';

import NavBar from '/components/layout/Navbar';
import UserInfo from '/components/UserInfo';
import Spinner from '/components/Spinner';
import Icon from '/components/Icon';

let process;
process.env.REACT_APP_BASE_URL = undefined;

function Dashboard() {
  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.app.user);
  userInfo.transferBalance = undefined;
  userInfo?.income = undefined;
  userInfo.refLink = undefined;
  const isLoading = useSelector(state => state.app.loadings.user);
  const isLoadingPublish = useSelector(state => state.app.loadings.publish);
  const [freeInfoAvatar, setFreeInfoAvatar] = useState(null);

  const copyRefLinkToClipboard = async () => {
    if (userInfo && userInfo.refLink) {
      navigator.clipboard.writeText(userInfo.refLink).then(() => {
        toast.info('Ссылка успешно скопирована');
      });
    }
  };

  useEffect(() => {
    async function fetchImage() {
      if (userInfo?.avatar) {
        const load = await fetch(
          `${process.env.REACT_APP_BASE_URL}${userInfo.avatar}`,
        );
        const blob = await load.blob();
        const resizeImage = await resizeFreeInformationImage(blob);
        setFreeInfoAvatar(resizeImage);
      } else {
        setFreeInfoAvatar(avatar);
      }
    }
    fetchImage();
  }, [userInfo]);

  actions.publishSummaryToTelegram = function () {
    return undefined;
  }
  actions.publishSummaryToTelegramUpload = function (imgData) {
    return undefined;
  }
  const downloadSummary = useCallback(async () => {
    dispatch(actions.publishSummaryToTelegram());
    try {
      const imgData = await htmlToImage.toBlob(
        document.getElementById('user_summary'),
        {
          style: { backgroundColor: '#130132' },
          cacheBust: true,
          pixelRatio: 1,
        },
      );

      if (imgData && userInfo?.income && userInfo?.avatar) {
        // Send to Telegram
        dispatch(actions.publishSummaryToTelegramUpload(imgData));
      } else if (imgData && userInfo) {
        const filename = userInfo.firstName.trim()
          ? `stars-summary-${userInfo.firstName.trim()}`
          : 'stars-summary';

        saveAs(imgData, `${filename}.jpeg`);
      }
    } catch (error) {
      Raven.captureException(error);
    }
  }, [dispatch, userInfo]);

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col>
          <h1 className="root-page-title">Личный кабинет</h1>
          <Spinner isLoading={isLoading}>
            {userInfo && (
              <>
                <UserInfo className="d-xl-none" />
                <div className="card">
                  <div className="card__header">
                    <div className="card__header-left">
                      <h3 className="card__title">Реферальная ссылка</h3>
                    </div>
                  </div>
                  <div className="card__body">
                    <div className="referral-link">
                      <div className="referral-link__url">
                        {userInfo.refLink}
                      </div>
                      <Button
                        color="link"
                        className="referral-link__btn"
                        onClick={copyRefLinkToClipboard}
                      >
                        <Icon iconName="copy" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Row>
                  <Col lg={6}>
                    <div className="card">
                      <div className="card__body">
                        <div className="list-info list-info--lg-space list-info--horizontal">
                          <div className="list-info__group">
                            <div className="list-info__label">Мой баланс</div>
                            <div className="list-info__value">
                              {formatter
                                .format(userInfo.balance || 0)
                                .replace('₽', 'ST')}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">
                              Транзитный баланс
                            </div>
                            <div className="list-info__value">
                              {formatter
                                .format(userInfo.transferBalance ? userInfo.transferBalance : 0)
                                .replace('₽', 'ST')}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">
                              Всего партнеров
                            </div>
                            <div className="list-info__value">
                              {userInfo.partners || 0}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">
                              Всего лично приглашенных партнеров
                            </div>
                            <div className="list-info__value">
                              {userInfo.firstLine || 0}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">
                              Активированные
                            </div>
                            <div className="list-info__value">
                              {userInfo.activePartners || 0}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">Заработок</div>
                            <div className="list-info__value">
                              {formatter
                                .format(userInfo.income ? userInfo.income : 0)
                                .replace('₽', 'ST')}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">Клоны</div>
                            <div className="list-info__value">
                              {userInfo.clones || 0}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">Кометы</div>
                            <div className="list-info__value">
                              {userInfo.comets || 0}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">Пригласитель</div>
                            <div className="list-info__value">
                              {userInfo.inviter}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="card">
                      <div className="card__header">
                        <div className="card__header-left">
                          <h3 className="card__title">
                            Персональная информация
                          </h3>
                        </div>
                      </div>
                      <div className="card__body">
                        <div className="list-info list-info--lg-space list-info--horizontal">
                          <div className="list-info__group">
                            <div className="list-info__label">Имя</div>
                            <div className="list-info__value">
                              {userInfo.firstName || '-'}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">Фамилия</div>
                            <div className="list-info__value">
                              {userInfo.lastName || '-'}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">Почта</div>
                            <div className="list-info__value">
                              {userInfo.email || '-'}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card">
                      <div className="card__body">
                        <div className="list-info list-info--lg-space list-info--horizontal">
                          <div className="list-info__group">
                            <div className="list-info__label">
                              Дата активации
                            </div>
                            <div className="list-info__value">
                              {userInfo.activationDate}
                            </div>
                          </div>
                          <div className="list-info__group">
                            <div className="list-info__label">
                              Дата регистрации
                            </div>
                            <div className="list-info__value">
                              {userInfo.registrationDate}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Col>
                </Row>

                <div className="free-information">
                  <Button
                    disabled={isLoadingPublish}
                    className="free-information__download"
                    onClick={downloadSummary}
                    color="link"
                  >
                    <Icon iconName="download" />
                  </Button>
                  <div className="free-information__render" id="user_summary">
                    <figure className="free-information__avatar">
                      <img
                        src={freeInfoAvatar || avatar}
                        alt={`${userInfo.firstName} ${userInfo.lastName}`}
                      />
                    </figure>
                    <div className="free-information__name">
                      <div>{userInfo.firstName}</div>
                      <div>{userInfo.lastName}</div>
                    </div>
                    <ul className="free-information__social">
                      <li>
                        {userInfo.myInstagram ? (
                          <a
                            href={`https://www.instagram.com/${userInfo.myInstagram}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <img
                              className="free-information__social--image"
                              src={inImage}
                              alt={userInfo.myInstagram}
                            />
                            {userInfo.myInstagram}
                          </a>
                        ) : (
                          '-'
                        )}
                      </li>
                      <li>
                        {userInfo.myTg ? (
                          <a
                            href={`https://t.me/${userInfo.myTg}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <img
                              className="free-information__social--image"
                              src={tgImage}
                              alt={userInfo.myTg}
                            />
                            {userInfo.myTg}
                          </a>
                        ) : (
                          '-'
                        )}
                      </li>
                      <li>
                        {userInfo.myVk ? (
                          <a
                            href={`https://vk.com/${userInfo.myVk}`}
                            rel="noreferrer"
                            target="_blank"
                          >
                            <img
                              className="free-information__social--image"
                              src={vkImage}
                              alt={userInfo.myVk}
                            />
                            {userInfo.myVk}
                          </a>
                        ) : (
                          '-'
                        )}
                      </li>
                    </ul>
                    <div className="free-information__total">
                      <div>Общий чек</div>
                      <strong>
                        {formatterNumber
                          .format(userInfo.income ? userInfo.income : 0)
                          .replace('₽', 'ST')}
                      </strong>
                    </div>
                  </div>
                </div>
              </>
            )}
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
