import isEqual from 'lodash/isEqual';
import { memo, JSX, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Loader } from '@/shared/ui/Loader';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch';
import { SearchFields } from '@/shared/types/search';
import { FlightList } from '@/entities/Flight';
import { searchFlightActions } from '../../model/slice/searchFlightSlice';
import { SearchFlightsForm } from '../SearchFlightsForm/SearchFlightsForm';
import { useFetchFlightsDataQuery } from '../../api/searchFlightsApi';
import {
	getLimit,
	getPage,
	getSearchFlightFields,
} from '../../model/selectors/searchFlightSelectors';
import cls from './SearchFlights.module.scss';

export const SearchFlights = memo(() => {
	const page = useSelector(getPage);
	const limit = useSelector(getLimit);
	const searchFlightFields = useSelector(getSearchFlightFields);
	const dispatch = useAppDispatch();
	const { data, isFetching, isError } = useFetchFlightsDataQuery({
		page,
		limit,
		searchFlightFields,
	});

	const onLoadMore = () => {
		dispatch(searchFlightActions.setPage());
	};

	const onSetSearchFields = useCallback(
		(searchFields: SearchFields) => {
			if (page !== 1) dispatch(searchFlightActions.setPage(1));
			if (!isEqual(searchFields, searchFlightFields))
				dispatch(searchFlightActions.setSearchFields(searchFields));
		},
		[dispatch, page, searchFlightFields]
	);

	let listContent: JSX.Element;

	if (isError) {
		listContent = (
			<div className={cls.noResult}>
				<h2>Что-то пошло не так...</h2>
			</div>
		);
	} else if (isFetching && page === 1) {
		listContent = (
			<div className={cls.loading}>
				<Loader theme="invert" />
			</div>
		);
	} else {
		listContent =
			data!.flights.length === 0 ? (
				<div className={cls.noResult}>
					<h2>По вашему запросу результатов не найдено</h2>
				</div>
			) : (
				<div className={cls.searchList}>
					<FlightList flights={data!.flights} />
					{!data!.endReached && (
						<button
							onClick={onLoadMore}
							disabled={isFetching}
							className={cls.loadMore}
						>
							{isFetching ? 'Загрузка...' : 'Показать еще'}
						</button>
					)}
				</div>
			);
	}

	return (
		<div className={cls.SearchFlight}>
			<SearchFlightsForm onSubmit={onSetSearchFields} isFetching={isFetching} />
			{listContent}
		</div>
	);
});
