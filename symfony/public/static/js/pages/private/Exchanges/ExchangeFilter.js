import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup, Button, Input, Label } from 'reactstrap';

import * as actions from 'actions/exchanges.actions';

const ExchangeFilter = () => {
  const dispatch = useDispatch();
  const { active, my } = useSelector(state => state.exchanges.query);

  const handleOnChangeStatus = useCallback(
    event => {
      const value = JSON.parse(event.target.value);
      dispatch(actions.setExchangesStatus(value));
    },
    [dispatch],
  );

  const handleOnChangeMy = useCallback(
    event => {
      dispatch(actions.setExchangesMy(event.target.checked));
    },
    [dispatch],
  );

  const handleChangeExchangeCreate = useCallback(() => {
    dispatch(actions.toggleExchangeCreateModal());
  }, [dispatch]);

  return (
    <div className="exchanges-filters">
      <div className="exchanges-filters__left">
        <Button color="primary" onClick={handleChangeExchangeCreate}>
          Создать лот
        </Button>
      </div>
      <div className="exchanges-filters__middle">
        <FormGroup check>
          <Input
            onChange={handleOnChangeMy}
            type="checkbox"
            value={my}
            id="my"
          />
          <Label check htmlFor="my">
            Показывать только мои лоты
          </Label>
        </FormGroup>
      </div>
      <div className="exchanges-filters__right">
        <Input
          type="select"
          className="form-control"
          onChange={handleOnChangeStatus}
          value={active}
        >
          <option value="true">Активные</option>
          <option value="false">Завершенные</option>
        </Input>
      </div>
    </div>
  );
};

export default ExchangeFilter;
