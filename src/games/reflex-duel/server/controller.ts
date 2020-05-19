import { WS_MSG, WsUser } from '../../../server/types';

import {
  Character, DuelState, Player, PlayerState, ServerGameState,
} from '../types';

import { WSReflexDuelActionTypes } from './actions';
import { createPlayer } from '../utils';
import { roomUsers } from '../../../server/entities/rooms';

const currentGames: { [key: string]: ServerGameState } = {};

const ReflexDuel = {
  registerPlayer(user: WsUser): void {
    const room = user.currentRoom;

    if (!currentGames[room]) {
      currentGames[room] = {
        isStarted: false,
        players: {},
        duel: {
          state: DuelState.IDLE,
          participants: {},
          results: {},
          timeouts: {},
        },
      };
    }

    const player = createPlayer(user.id);

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
  startDuel(user: WsUser): void {
    const room = user.currentRoom;

    if (currentGames[room] && !currentGames[room].isStarted) {
      currentGames[room].isStarted = true;
    }
  },
  playerReady(user: WsUser): void {
    const room = user.currentRoom;

    currentGames[room].duel.participants[user.id] = PlayerState.READY;

    const players = Object.values(currentGames[room].duel.participants);

    if (players.length === 1 && players.every((state) => state === PlayerState.READY)) {
      const waitingTime = Math.floor(Math.random() * 5000) + 2300;

      currentGames[room].duel.timeouts.strikeTimer = setTimeout(() => {
        currentGames[room].duel.state = DuelState.STRIKE;
        roomUsers(room).forEach((u) => u.sendMessage({
          type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_NOW,
        }));
      }, waitingTime);
    }
  },
  strikeInput(room: string, userId: string, speed: number): void {
    // clear ongoing timeouts
    Object.values(currentGames[room].duel.timeouts).forEach((t) => clearTimeout(t));

    // user was too early
    if (currentGames[room].duel.state === DuelState.IDLE) {
      roomUsers(room).forEach((u) => u.sendMessage({
        type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CALL_TIE,
        id: userId,
      }));
      return;
    }

    // receive input
    if (currentGames[room].duel.participants[userId] === PlayerState.READY) {
      currentGames[room].duel.participants[userId] = PlayerState.INPUT;
      currentGames[room].duel.results[userId] = speed;
    }

    const results = Object.entries(currentGames[room].duel.results);

    if (results.length === 2) {
      // if same results
      if (results[0][1] === results[1][1]) {
        roomUsers(room).forEach((u) => u.sendMessage({
          type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CALL_TIE,
        }));
      } else {
        const sortedResults = results.sort(([, a], [, b]) => {
          if (a < b) {
            return -1;
          }
          return 1;
        });

        const winner = sortedResults[0][0];
        const loser = sortedResults[1][0];

        currentGames[room].players[winner].wins += 1;
        currentGames[room].players[loser].loses += 1;

        roomUsers(room).forEach((u) => u.sendMessage({
          type: WSReflexDuelActionTypes.WS_REFLEX_DUEL_CALL_WINNER,
          id: winner,
        }));
      }

      // wipe duel
      currentGames[room].duel.state = DuelState.IDLE;
      currentGames[room].duel.participants = {};
      currentGames[room].duel.results = {};
    } else {
      // set a timer for auto triggering when no input from other
      const otherPlayer = Object.keys(currentGames[room].duel.participants).find((k) => k !== userId) || '';
      const waitingTime = 100;

      currentGames[room].duel.timeouts[userId] = setTimeout(() => {
        ReflexDuel.strikeInput(
          room,
          otherPlayer,
          speed + waitingTime,
        );
      }, waitingTime);
    }
  },
};

function handleMessage(data: WS_MSG, user: WsUser): void {
  switch (data.type) {
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_REGISTER_PLAYER:
      return ReflexDuel.registerPlayer(user);
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_CHANGE_CHARACTER:
      return ReflexDuel.changeCharacter(user, data.character);
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_START_DUEL:
      return ReflexDuel.startDuel(user);
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_PLAYER_READY:
      return ReflexDuel.playerReady(user);
    case WSReflexDuelActionTypes.WS_REFLEX_DUEL_STRIKE_INPUT:
      return ReflexDuel.strikeInput(user.currentRoom, user.id, data.speed);
    default:
      return undefined;
  }
}

export default handleMessage;
