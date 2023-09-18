import {memo} from 'react';
import cls from './Flight.module.scss';
import {FlightCard} from "./FlightCard/FlightCard";

interface IFlightProps {
	flight: any
}

export const Flight = memo((props: IFlightProps) => {
	const { flight } = props;

	console.log(flight)

	return (
		<div>
			<div className={cls.FlightHeader}>
				<div>{flight.flight.carrier.caption}</div>
				<div>{`${flight.flight.price.total.amount} ${flight.flight.price.total.currency}`}</div>
			</div>
			<FlightCard leg={flight.flight.legs[0]} />
			<hr className={cls.hr} />
			<FlightCard leg={flight.flight.legs[1]} />
		</div>
	);
});
