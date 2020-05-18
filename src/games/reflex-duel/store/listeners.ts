import { Dispatch } from 'react';
import { Subject } from 'rxjs';
import { ofType } from '../../../ws/utils';

import { ReflexDuelAction, ReflexDuelActionType } from './actions';
import { WS_MSG } from '../../../server/types';
import { WS_REFLEXDUEL_MESSAGE, WSReflexDuelActionTypes } from '../server/actions';

function onRegisterPlayer(
  webSocketMessage$: Subject<WS_REFLEXDUEL_MESSAGE>,
  dispatch: Dispatch<ReflexDuelAction>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTERED_PLAYER),
    )
    .subscribe((action) => {
      if (action.type !== WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTERED_PLAYER) return;

      dispatch({
        type: ReflexDuelActionType.REGISTERED_PLAYER,
        player: action.player,
      });
    });
}

function onChangedCharacter(
  webSocketMessage$: Subject<WS_REFLEXDUEL_MESSAGE>,
  dispatch: Dispatch<ReflexDuelAction>,
): void {
  webSocketMessage$
    .pipe(
      ofType(WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGED_CHARACTER),
    )
    .subscribe((action) => {
      if (action.type !== WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGED_CHARACTER) return;

      dispatch({
        type: ReflexDuelActionType.CHANGED_CHARACTER,
        id: action.id,
        character: action.character,
      });
    });
}

export default [onRegisterPlayer, onChangedCharacter]
  .map((f) => (
    webSocketMessage$: Subject<WS_MSG>,
    dispatch: Dispatch<ReflexDuelAction>,
  ): void => {
    f(webSocketMessage$ as Subject<WS_REFLEXDUEL_MESSAGE>, dispatch);
  });
