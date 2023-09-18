import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { StateSchema } from '../types/StateSchema';
import { createReduxStore } from '../store';

interface IStoreProviderProps {
	children: ReactNode;
	initialState?: StateSchema;
}

export const StoreProvider = ({
	children,
	initialState,
}: IStoreProviderProps) => {
	const store = createReduxStore(initialState);

	return <Provider store={store}>{children}</Provider>;
};
