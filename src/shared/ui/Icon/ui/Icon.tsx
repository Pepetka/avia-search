import { FC, memo, SVGProps } from 'react';
import { classNames } from '@/shared/helpers/classNames/classNames';
import cls from './Icon.module.scss';

interface IIconProps {
	SvgIcon: FC<SVGProps<SVGSVGElement>> | string;
	invert?: boolean;
	className?: string;
}

export const Icon = memo((props: IIconProps) => {
	const { SvgIcon, className, invert = false } = props;

	return (
		<div
			className={classNames([cls.Icon, className], { [cls.invert]: invert })}
		>
			<SvgIcon />
		</div>
	);
});
