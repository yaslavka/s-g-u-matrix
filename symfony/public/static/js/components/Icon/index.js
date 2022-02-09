import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import spriteIcons from '../../assets/svg/sprite-icons.svg';

function Icon({ iconName, externalClass }) {
  const defaultClass = classNames('icons', {
    [iconName]: Boolean(iconName),
    [externalClass]: Boolean(externalClass),
  });

  return (
    <svg className={defaultClass}>
      <use xlinkHref={`${spriteIcons}#${iconName}`} />
    </svg>
  );
}

Icon.propTypes = {
  iconName: PropTypes.string.isRequired,
  externalClass: PropTypes.string,
};

Icon.defaultProps = {
  externalClass: '',
};

export default Icon;
