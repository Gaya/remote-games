import React, { useCallback, useState } from 'react';

import { Game } from '../../core/games/types';

import { Button, H5, Intent } from '../UI';

import './Cover.css';

interface CoverProps {
  game: Game;
  onStart: (id: string) => void;
}

const Cover: React.FC<CoverProps> = ({ game, onStart }) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const onMouseOver = useCallback(() => {
    setIsActive(true);
  }, []);

  const onMouseLeave = useCallback(() => {
    setIsActive(false);
  }, []);

  return (
    <div
      className={['Cover', isActive ? 'Cover--active' : undefined].join(' ')}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseLeave}
    >
      <img src={game.cover} alt={game.name} />
      <H5>
        {game.name}
      </H5>
      <div className="Cover__Actions">
        <Button
          title="Play Now"
          intent={Intent.PRIMARY}
          large
          type="button"
          onClick={(): void => onStart(game.id)}
        >
          Play Now
        </Button>
      </div>
    </div>
  );
};

export default Cover;
