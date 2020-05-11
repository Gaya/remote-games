import { BehaviorSubject } from 'rxjs';

import { Games } from './types';

const games$ = new BehaviorSubject<Games>({});

export default games$;
