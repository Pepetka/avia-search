import { SearchFields } from '@/shared/types/search';

export interface SearchFlightSchema {
	page: number;
	_limit: number;

	searchFields: SearchFields;
}
