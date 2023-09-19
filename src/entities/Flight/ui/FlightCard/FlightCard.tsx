import { memo } from 'react';
import { Icon } from '@/shared/ui/Icon';
import ArrowSvg from '@/shared/assets/icons/arrow.svg';
import ClockSvg from '@/shared/assets/icons/clock.svg';
import { classNames } from '@/shared/helpers/classNames/classNames';
import { Leg } from '@/shared/types/Flights';
import cls from './FlightCard.module.scss';

interface IFlightCardProps {
	leg: Leg;
}

function padTo2Digits(num: number) {
	return num.toString().padStart(2, '0');
}

function toHoursAndMinutes(totalMinutes: number) {
	const minutes = totalMinutes % 60;
	const hours = Math.floor(totalMinutes / 60);

	return `${hours} ч ${minutes} мин`;
}

const monthMapper = [
	null,
	'янв.',
	'февр.',
	'марта',
	'апр.',
	'мая',
	'июня',
	'июля',
	'авг.',
	'сент.',
	'окт.',
	'нояб.',
	'дек.',
];

const dayMapper = [null, 'пн.', 'вт.', 'ср.', 'чт.', 'пт.', 'сб.', 'вс.'];

function toHoursAndMinutesWithDate(date: string) {
	const newDate = new Date(date);

	return {
		time: `${padTo2Digits(newDate.getHours())}:${padTo2Digits(
			newDate.getMinutes()
		)}`,
		date: `${newDate.getDate()} ${monthMapper[newDate.getMonth()]} ${
			dayMapper[newDate.getDay()]
		}`,
	};
}

export const FlightCard = memo((props: IFlightCardProps) => {
	const { leg } = props;

	return (
		<div className={cls.FlightCard}>
			<div className={cls.way}>
				{/* Место отправления */}
				<div>
					{leg.segments[0].departureCity
						? `${leg.segments[0].departureCity.caption}, `
						: ''}
					{`${leg.segments[0].departureAirport.caption} `}
					<span
						className={cls.airportUid}
					>{`(${leg.segments[0].departureAirport.uid})`}</span>
				</div>
				<Icon SvgIcon={ArrowSvg} className={cls.arrow} />
				{/* Место прибытия */}
				<div>
					{leg.segments[leg.segments.length - 1].arrivalCity
						? `${leg.segments[leg.segments.length - 1].arrivalCity.caption}, `
						: ''}
					{`${leg.segments[leg.segments.length - 1].arrivalAirport.caption} `}
					<span className={cls.airportUid}>{`(${
						leg.segments[leg.segments.length - 1].arrivalAirport.uid
					})`}</span>
				</div>
			</div>
			<div className={cls.timeDurationTime}>
				{/* Время отправления */}
				<div className={classNames([cls.timeDate, cls.timeDate1])}>
					{toHoursAndMinutesWithDate(leg.segments[0].departureDate).time}
					<span className={cls.date}>
						{toHoursAndMinutesWithDate(leg.segments[0].departureDate).date}
					</span>
				</div>
				{/* Время полета */}
				<div className={cls.duration}>
					<Icon SvgIcon={ClockSvg} className={cls.clock} />
					{toHoursAndMinutes(leg.duration)}
				</div>
				{/* Время прибытия */}
				<div className={classNames([cls.timeDate, cls.timeDate2])}>
					<span className={cls.date}>
						{
							toHoursAndMinutesWithDate(
								leg.segments[leg.segments.length - 1].arrivalDate
							).date
						}
					</span>
					{
						toHoursAndMinutesWithDate(
							leg.segments[leg.segments.length - 1].arrivalDate
						).time
					}
				</div>
			</div>
			{/* Количество пересадок */}
			{leg.segments.length !== 1 ? (
				<div className={cls.transfers}>{leg.segments.length - 1} пересадка</div>
			) : (
				<div className={cls.line} />
			)}
			{/* Компания */}
			<div style={{ textAlign: 'start' }}>
				Рейс выполняет: {leg.segments[0].airline.caption}
			</div>
		</div>
	);
});
