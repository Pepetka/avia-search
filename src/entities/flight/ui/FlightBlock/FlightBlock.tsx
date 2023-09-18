import { memo } from 'react';
import { FlightCard } from '../FlightCard/FlightCard.tsx';
import cls from './FlightBlock.module.scss';

interface IFlightProps {
	flight: any;
}

export const FlightBlock = memo((props: IFlightProps) => {
	const { flight } = props;

	return (
		<>
			<div className={cls.FlightHeader}>
				<div className={cls.carrier}>{flight.flight.carrier.caption}</div>
				<div className={cls.price}>
					<div>{`${flight.flight.price.total.amount}`} &#x20bd;</div>
					<span>Стоимость для одного взрослого пассажира</span>
				</div>
			</div>
			<FlightCard leg={flight.flight.legs[0]} />
			<hr className={cls.hr} />
			<FlightCard leg={flight.flight.legs[1]} />
		</>
	);
});
