import {memo} from 'react';
import cls from './FlightCard.module.scss';

interface IFlightCardProps {
	leg: any;
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
]

const dayMapper = [
	null,
	'пн.',
	'вт.',
	'ср.',
	'чт.',
	'пт.',
	'сб.',
	'вс.',
]

function toHoursAndMinutesWithDate(date: string) {
	const newDate = new Date(date);

	return {
		time: `${padTo2Digits(newDate.getHours())}:${padTo2Digits(newDate.getMinutes())}`,
		date: `${newDate.getDate()} ${monthMapper[newDate.getMonth()]} ${dayMapper[newDate.getDay()]}`
	};
}

export const FlightCard = memo((props: IFlightCardProps) => {
	const {leg} = props;

	return (
		<div className={cls.FlightCard}>
			<div>
				<span>{`${leg.segments[0].departureCity.caption}, ${leg.segments[0].departureAirport.caption} `}</span>
				<span className={cls.airportUid}>{`(${leg.segments[0].departureAirport.uid})`}</span>
				&emsp;
				&#8594;
				&emsp;
				<span>{`${leg.segments[leg.segments.length - 1].arrivalCity.caption}, ${leg.segments[leg.segments.length - 1].arrivalAirport.caption} `}</span>
				<span className={cls.airportUid}>{`(${leg.segments[leg.segments.length - 1].arrivalAirport.uid})`}</span>
			</div>
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<div>
					{toHoursAndMinutesWithDate(leg.segments[0].departureDate).time}
					&emsp;
					<span className={cls.date}>{toHoursAndMinutesWithDate(leg.segments[0].departureDate).date}</span></div>
				<div>{toHoursAndMinutes(leg.duration)}</div>
				<div>
					<span className={cls.date}>{toHoursAndMinutesWithDate(leg.segments[leg.segments.length - 1].arrivalDate).date}</span>
					&emsp;
					{toHoursAndMinutesWithDate(leg.segments[leg.segments.length - 1].arrivalDate).time}
				</div>
			</div>
			<div className={cls.transfers}>{leg.segments.length - 1} пересадка</div>
			<div style={{ textAlign: "start" }}>Рейс выполняет: {leg.segments[0].airline.caption}</div>
		</div>
	);
});
