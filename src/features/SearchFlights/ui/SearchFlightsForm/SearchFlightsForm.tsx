import { ChangeEvent, FormEvent, memo, useState } from 'react';
import { SearchFields } from '@/shared/types/search';
import { Loader } from '@/shared/ui/Loader';
import { useGetCompaniesFiltersQuery } from '../../api/searchFlightsApi';
import cls from './SearchFlightsForm.module.scss';

interface ISearchFlightFormProps {
	onSubmit?: (data: Inputs) => void;
}

type Inputs = SearchFields;

const sortInputs: { name: Inputs['sort']; label: string }[] = [
	{
		name: 'asc',
		label: '- по возрастанию цены',
	},
	{
		name: 'desc',
		label: '- по убыванию цены',
	},
	{
		name: 'time',
		label: '- по времени в пути',
	},
];

const filterInputs: { name: Inputs['filter'][number]; label: string }[] = [
	{
		name: '1transfer',
		label: '- 1 пересадка',
	},
	{
		name: '0transfer',
		label: '- без пересадок',
	},
];

const priceInputs: { name: 'priceFrom' | 'priceTo'; label: string }[] = [
	{
		name: 'priceFrom',
		label: 'От',
	},
	{
		name: 'priceTo',
		label: 'До',
	},
];

export const SearchFlightsForm = memo((props: ISearchFlightFormProps) => {
	const { onSubmit } = props;
	const { data, isLoading, isError } = useGetCompaniesFiltersQuery();
	const [form, setForm] = useState<Inputs>({
		sort: 'time',
		filter: [],
		price: ['', ''],
		companies: [],
	});

	const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		onSubmit?.(form);
	};

	const onChangeSort = (event: ChangeEvent<HTMLInputElement>) => {
		setForm((prev) => ({
			...prev,
			sort: event.target.value as Inputs['sort'],
		}));
	};

	const onChangeFilter = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value as Inputs['filter'][number];

		setForm((prev) => {
			const filter: Inputs['filter'] = prev.filter.includes(value)
				? prev.filter.filter((el) => el !== value)
				: [...prev.filter, value];

			return {
				...prev,
				filter,
			};
		});
	};

	const onChangePrice = (event: ChangeEvent<HTMLInputElement>) => {
		const name = event.target.name as 'priceFrom' | 'priceTo';

		setForm((prev) => {
			const price =
				name === 'priceFrom'
					? [event.target.value, prev.price[1]]
					: [prev.price[0], event.target.value];

			return {
				...prev,
				price,
			};
		});
	};

	const onChangeCompany = (event: ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;

		setForm((prev) => {
			return {
				...prev,
				companies: prev.companies.includes(value)
					? [
							...prev.companies.slice(
								0,
								prev.companies.findIndex((val) => val == value)
							),
							...prev.companies.slice(
								prev.companies.findIndex((val) => val == value) + 1
							),
					  ]
					: [...prev.companies, value],
			};
		});
	};

	return (
		<form className={cls.SearchFlightsForm} onSubmit={onSubmitHandle}>
			<fieldset>
				<legend>Сортировать</legend>
				{sortInputs.map(({ name, label }) => (
					<label key={name}>
						<input
							type="radio"
							value={name}
							name={name}
							checked={form.sort === name}
							onChange={onChangeSort}
						/>{' '}
						{label}
					</label>
				))}
			</fieldset>

			<fieldset>
				<legend>Фильтровать</legend>
				{filterInputs.map(({ name, label }) => (
					<label key={name}>
						<input
							type="checkbox"
							value={name}
							name={name}
							onChange={onChangeFilter}
							checked={form.filter.includes(name)}
						/>{' '}
						{label}
					</label>
				))}
			</fieldset>

			<fieldset className={cls.priceBlock}>
				<legend>Цена</legend>
				{priceInputs.map(({ name, label }) => (
					<label key={name}>
						<span>{`${label}`} </span>
						<input
							type="number"
							name={name}
							value={form.price[name === 'priceFrom' ? 0 : 1]}
							onChange={onChangePrice}
						/>
					</label>
				))}
			</fieldset>

			{!isError && (
				<fieldset className={cls.companiesBlock}>
					<legend>Авиакомпании</legend>
					{isLoading && (
						<div className={cls.filtersLoading}>
							<Loader theme="invert" />
						</div>
					)}
					{data?.companiesFilters &&
						Object.entries(data?.companiesFilters).map(([name, price]) => (
							<label key={name}>
								<div>
									<input
										type="checkbox"
										value={name}
										name={name}
										onChange={onChangeCompany}
										checked={form.companies.includes(name)}
									/>{' '}
									<span>{`- ${name}`}</span>
								</div>
								{` от ${price} р.`}
							</label>
						))}
				</fieldset>
			)}

			<input type="submit" hidden />
		</form>
	);
});
