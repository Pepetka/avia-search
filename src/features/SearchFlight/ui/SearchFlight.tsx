import {memo} from 'react';
import {useFetchFlightsDataQuery} from '../api/searchFlight';
import {Flight} from "@/entities/flight";
import {Loader} from "@/shared/ui/Loader";
import cls from './SearchFlight.module.scss';

export const SearchFlight = memo(() => {
	const {data, isFetching, isError} = useFetchFlightsDataQuery({})

	if (isError) {
		return null;
	}

	if (isFetching) {
		return (
			<div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
				<Loader theme="invert" />
			</div>
		);
	}

	return (
		<div className={cls.SearchFlights}>
			{data!.map((flight, index) => {
				if (index > 10) return null
				return (
					<>
						<Flight flight={flight} />
						<button className={cls.chooseButton}>ВЫБРАТЬ</button>
					</>
				)
			})}
		</div>
	);
});
