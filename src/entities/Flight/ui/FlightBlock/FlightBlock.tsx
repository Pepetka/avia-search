import { memo } from 'react';
import { FlightResponse } from '@/shared/types/Flights';
import { FlightCard } from '../FlightCard/FlightCard';
import cls from './FlightBlock.module.scss';

interface IFlightProps {
	flight: FlightResponse;
}

export const FlightBlock = memo((props: IFlightProps) => {
	const { flight } = props;

	return (
		<div className={cls.FlightBlock}>
			<div className={cls.FlightHeader}>
				{/* Компания */}
				<div className={cls.carrier}>{flight.flight.carrier.caption}</div>
				{/* Стоимость */}
				<div className={cls.price}>
					<div>{`${flight.flight.price.total.amount}`} &#x20bd;</div>
					<span>Стоимость для одного взрослого пассажира</span>
				</div>
			</div>
			{/* Туда */}
			<FlightCard leg={flight.flight.legs[0]} />
			<hr className={cls.hr} />
			{/* Обратно */}
			<FlightCard leg={flight.flight.legs[1]} />
		</div>
	);
});
