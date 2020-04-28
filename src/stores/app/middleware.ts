import { AppActions } from './actions';
import { AppState } from './types';

function logMiddleware(state: AppState, action: AppActions) {
  console.log(state, action);
}

const middleware = [logMiddleware];

export default middleware;
