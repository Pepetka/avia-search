export const classNames = (
	classes: (string | undefined)[],
	classesByCondition: Record<string, boolean> = {}
) => {
	const classesByConditionArr = Object.entries(classesByCondition).reduce<
		string[]
	>((acc, [key, value]) => {
		if (value) return [...acc, key];

		return acc;
	}, []);

	return [...classes.filter((cls) => !!cls), ...classesByConditionArr].join(
		' '
	);
};
