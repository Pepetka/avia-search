import { ChangeEvent, FormEvent, memo, useState } from 'react';
import { SearchFields } from '@/shared/types/search';

interface ISearchFlightFormProps {
	onSubmit?: (data: Inputs) => void;
}

type Inputs = SearchFields;

export const SearchFlightForm = memo((props: ISearchFlightFormProps) => {
	const { onSubmit } = props;
	const [form, setForm] = useState<Inputs>({
		sort: 'time',
		filter: [],
		price: ['', ''],
		companies: [],
	});

	const onSubmitHandle = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		onSubmit?.(form);
		console.log(form);
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

	return (
		<form onSubmit={onSubmitHandle}>
			<fieldset>
				<legend>Сортировать</legend>
				<label>
					<input
						type="radio"
						value="asc"
						name="asc"
						checked={form.sort === 'asc'}
						onChange={onChangeSort}
					/>{' '}
					- по возрастанию цены
				</label>
				<label>
					<input
						type="radio"
						value="desc"
						name="desc"
						checked={form.sort === 'desc'}
						onChange={onChangeSort}
					/>{' '}
					- по убыванию цены
				</label>
				<label>
					<input
						type="radio"
						value="time"
						name="time"
						checked={form.sort === 'time'}
						onChange={onChangeSort}
					/>{' '}
					- по времени в пути
				</label>
			</fieldset>

			<fieldset>
				<legend>Фильтровать</legend>
				<label>
					<input
						type="checkbox"
						value="1transfer"
						name="1transfer"
						onChange={onChangeFilter}
						checked={form.filter.includes('1transfer')}
					/>{' '}
					- 1 пересадка
				</label>
				<label>
					<input
						type="checkbox"
						value="0transfer"
						name="0transfer"
						onChange={onChangeFilter}
						checked={form.filter.includes('0transfer')}
					/>{' '}
					- без пересадок
				</label>
			</fieldset>

			<fieldset>
				<legend>Цена</legend>
				<label>
					<input
						type="number"
						name="priceFrom"
						value={form.price[0]}
						onChange={onChangePrice}
					/>{' '}
					- 1 пересадка
				</label>
				<label>
					<input
						type="number"
						name="priceTo"
						value={form.price[1]}
						onChange={onChangePrice}
					/>{' '}
					- без пересадок
				</label>
			</fieldset>

			<input type="submit" hidden />
		</form>
	);
});
