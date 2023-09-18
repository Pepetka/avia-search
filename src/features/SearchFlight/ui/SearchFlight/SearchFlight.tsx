import { memo } from 'react';
import { useSelector } from 'react-redux';
import { FlightList } from '@/entities/flight';
import { Loader } from '@/shared/ui/Loader';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch.ts';
import { searchFlightActions } from '@/features/SearchFlight/model/slice/searchFlightSlice.ts';
import { SearchFields } from '@/shared/types/search.ts';
import { useFetchFlightsDataQuery } from '../../api/searchFlightApi';
import { SearchFlightForm } from '../SearchFlightForm/SearchFlightForm';
import {
	getLimit,
	getPage,
	getSearchFlightFields,
} from '../../model/selectors/searchFlightSelectors';
import cls from './SearchFlight.module.scss';

export const SearchFlight = memo(() => {
	const page = useSelector(getPage);
	const limit = useSelector(getLimit);
	const searchFlightFields = useSelector(getSearchFlightFields);
	const dispatch = useAppDispatch();
	const { data, isFetching, isLoading, isError } = useFetchFlightsDataQuery({
		page,
		limit,
		searchFlightFields,
	});

	const onLoadMore = () => {
		dispatch(searchFlightActions.setPage());
	};

	const onSetSearchFields = (data: SearchFields) => {
		dispatch(searchFlightActions.setPage(1));
		dispatch(searchFlightActions.setSearchFields(data));
	};

	if (isError) {
		return null;
	}

	if (isLoading) {
		return (
			<div className={cls.loading}>
				<Loader theme="invert" />
			</div>
		);
	}

	return (
		<div className={cls.SearchFlight}>
			<SearchFlightForm onSubmit={onSetSearchFields} />
			{data!.length === 0 ? (
				<div className={cls.SearchFlight}>
					<h2>По вашему запросу результатов не найдено</h2>
				</div>
			) : (
				<div className={cls.searchList}>
					<FlightList flights={data!} />
					<button
						onClick={onLoadMore}
						disabled={isFetching}
						className={cls.loadMore}
					>
						{isFetching ? 'Загрузка...' : 'Показать еще'}
					</button>
				</div>
			)}
		</div>
	);
});
