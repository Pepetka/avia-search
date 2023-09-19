import { memo } from 'react';
import cls from './PageError.module.scss';

export const PageError = memo(() => {
	return (
		<div className={cls.PageError}>
			<h1>Что-то пошло не так</h1>
			<button className={cls.reload} onClick={() => window.location.reload()}>
				Перезагрузить
			</button>
		</div>
	);
});
