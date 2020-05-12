import React from 'react';
import classNames from 'classnames';

import { H3 } from '../../../components/UI';

const Duel: React.FC = () => {
  const showStrike = true;

  return (
    <>
      <H3>
        {['Player 1', 'Player 2'].join(' VS ')}
      </H3>
      <button
        type="button"
        className={classNames(
          'ReflexDuel__StrikeIndicator',
          { 'ReflexDuel__StrikeIndicator--strike': showStrike },
        )}
      >
        !!
      </button>
    </>
  );
};

export default Duel;
