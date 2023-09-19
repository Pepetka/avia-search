import { memo } from 'react';
import { FlightResponse } from '@/shared/types/Flights';
import { FlightBlock } from '../FlightBlock/FlightBlock';
import cls from './FlightList.module.scss';

interface IFlightListProps {
	flights: FlightResponse[];
}

export const FlightList = memo((props: IFlightListProps) => {
	const { flights } = props;

	return (
		<div className={cls.SearchFlights}>
			{flights.map((flight) => (
				<div key={flight.flightToken} className={cls.card}>
					<FlightBlock flight={flight} />
					<button className={cls.chooseButton}>ВЫБРАТЬ</button>
				</div>
			))}
		</div>
	);
});
