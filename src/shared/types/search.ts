export interface SearchFields {
	sort: 'asc' | 'desc' | 'time';
	filter: ('1transfer' | '0transfer')[];
	price: string[];
	companies: string[];
}
