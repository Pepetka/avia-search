import { memo } from 'react';
import { classNames } from '@/shared/helpers/classNames/classNames';
import cls from './Loader.module.scss';

export type LoaderTheme = 'normal' | 'invert';

interface ILoaderProps {
	theme?: LoaderTheme;
}

export const Loader = memo((props: ILoaderProps) => {
	const { theme = 'normal' } = props;

	return (
		<div
			className={classNames([cls.Loader], { [cls.invert]: theme === 'invert' })}
		>
			<div></div>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);
});
