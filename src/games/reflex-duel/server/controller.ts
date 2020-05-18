import { WS_MSG, WsUser } from '../../../server/types';

import { Character, GameState, Player } from '../types';

import { WSReflexDuelActionTypes } from './actions';
import { createPlayer } from '../utils';

const currentGames: { [key: string]: GameState } = {};

const ReflexDuel = {
  registerPlayer(user: WsUser, character: Character): void {
    const room = user.currentRoom;

    if (!currentGames[room]) {
      currentGames[room] = { players: {} };
    }

    const player = createPlayer(user.id, character);

    // add player to room
    currentGames[room].players = {
      ...currentGames[room].players,
      [user.id]: player,
    };

    // send list of current players
    Object.entries(currentGames[room].players).forEach(([key, value]: [string, Player]) => {
      if (key !== user.id) {
        user.sendMessage({
          type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTERED_PLAYER,
          player: value,
        });
      }
    });

    // update others about registering party
    user.sendToRoom({
      type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTERED_PLAYER,
      player,
    });
  },
  changeCharacter(user: WsUser, character: Character): void {
    const room = user.currentRoom;

    currentGames[room].players = {
      ...currentGames[room].players,
      [user.id]: {
        ...currentGames[room].players[user.id],
        character,
      },
    };

    user.sendToRoom({
      type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGED_CHARACTER,
      id: user.id,
      character,
    });
  },
};

function handleMessage(data: WS_MSG, user: WsUser): void {
  switch (data.type) {
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTER_PLAYER:
      return ReflexDuel.registerPlayer(user, data.character);
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER:
      return ReflexDuel.changeCharacter(user, data.character);
    default:
      return undefined;
  }
}

export default handleMessage;
