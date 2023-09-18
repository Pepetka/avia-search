import { createReduxStore } from '../store';

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
