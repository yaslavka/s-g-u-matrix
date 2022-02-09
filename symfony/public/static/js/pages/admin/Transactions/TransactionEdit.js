import React, { useEffect, useCallback, useMemo } from 'react';
import { Row, Col, Container, FormGroup, Label } from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

import * as actions from 'actions/transactions.actions';
import {
  STATE_OPTIONS,
  TRANSACTION_TYPE,
  DIRECTION_OPTIONS,
} from './constants';
import NavBar from 'components/layout/Navbar';
import UserInfo from 'components/UserInfo';
import Spinner from 'components/Spinner';
import Button from 'components/Button';
import Input from 'components/Input';
import Icon from 'components/Icon';

const TransactionEdit = () => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const current = useSelector(state => state.transactions.current);
  const isLoading = useSelector(state => state.transactions.loadings.getOne);
  const updateIsLoading = useSelector(
    state => state.transactions.loadings.updateOne,
  );

  useEffect(() => {
    if (id) {
      dispatch(actions.getTransaction(id));
    }
  }, [dispatch, id]);

  const validationSchema = useMemo(
    () =>
      yup.object({
        id: yup.number().required(),
        userId: yup.number().required(),
        state: yup.number().required(),
        transactionType: yup.number().required(),
        direction: yup.number().required(),
        amount: yup.number().required(),
        wallet: yup.string().trim().nullable(),
        dateCreate: yup.string().required(),
        toUsername: yup.string().nullable(),
        fromMatrix: yup.number().nullable(),
      }),
    [],
  );

  const initialValues = useMemo(() => current, [current]);

  const handleOnSubmit = useCallback(
    values => {
      const payload = {
        id: values.id,
        userId: Number(values.userId),
        state: Number(values.state),
        transactionType: Number(values.transactionType),
        direction: Number(values.direction),
        amount: Number(values.amount),
        wallet: values.wallet || null,
        dateCreate: values.dateCreate,
        toUserId: values.toUserId ? Number(values.toUserId) : null,
        fromMatrix: values.fromMatrix ? Number(values.fromMatrix) : null,
      };
      dispatch(actions.updateTransaction(payload));
    },
    [dispatch],
  );

  return (
    <Container className="root-page">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <UserInfo />
          <NavBar />
        </Col>
        <Col xl={9}>
          <div className="root-page-header">
            <div className="root-page-header__left">
              <Button
                className="root-page-header__back"
                onClick={() => history.goBack()}
                color="link"
                size="lg"
              >
                <Icon iconName="back" />
              </Button>
            </div>
            <h1 className="root-page-title">Транзакция ID:{current?.id}</h1>
            <div className="root-page-header__right">&nbsp;</div>
          </div>
          <Spinner isLoading={isLoading}>
            <Row>
              <Col lg={6}>
                <Formik
                  enableReinitialize
                  validationSchema={validationSchema}
                  initialValues={initialValues}
                  onSubmit={handleOnSubmit}
                >
                  {({ isValid, dirty, values }) => (
                    <Form>
                      <FormGroup>
                        <Field
                          type="text"
                          name="username"
                          disabled
                          placeholder="Пользователь"
                          component={Input}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Label className="mb-0">Состояние</Label>
                        <Field
                          as="select"
                          name="state"
                          className="form-control"
                        >
                          {STATE_OPTIONS.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Label className="mb-0">Тип</Label>
                        <Field
                          as="select"
                          name="transactionType"
                          className="form-control"
                        >
                          {TRANSACTION_TYPE.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Label className="mb-0">Операция</Label>
                        <Field
                          as="select"
                          name="direction"
                          className="form-control"
                        >
                          {DIRECTION_OPTIONS.map((state, index) => (
                            <option key={index} value={state.value}>
                              {state.label}
                            </option>
                          ))}
                        </Field>
                      </FormGroup>
                      <FormGroup>
                        <Field
                          type="number"
                          name="amount"
                          placeholder="Сумма"
                          component={Input}
                        />
                      </FormGroup>
                      <FormGroup>
                        <Field
                          type="text"
                          name="wallet"
                          placeholder="Кошелек"
                          component={Input}
                        />
                      </FormGroup>
                      {(values?.transactionType === 8 ||
                        values?.transactionType === 9) && (
                        <FormGroup>
                          <Field
                            type="text"
                            name="toUsername"
                            placeholder={
                              (values?.transactionType === 8 &&
                                'Логин получателя') ||
                              (values?.transactionType === 9 &&
                                'Логин отправителя')
                            }
                            component={Input}
                            disabled
                          />
                        </FormGroup>
                      )}

                      <FormGroup>
                        <Field
                          type="number"
                          name="fromMatrix"
                          placeholder="Номер матрицы от которой пришел бонус"
                          component={Input}
                          disabled
                        />
                      </FormGroup>
                      <br />
                      <Button
                        type="submit"
                        color="primary"
                        disabled={
                          !(isValid && dirty) || isLoading || updateIsLoading
                        }
                        loading={isLoading || updateIsLoading}
                        block
                      >
                        Обновить
                      </Button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </Spinner>
        </Col>
      </Row>
    </Container>
  );
};

export default TransactionEdit;
