export interface Leg {
	duration: number;
	segments: {
		classOfServiceCode: string;
		classOfService: {
			uid: string;
			caption: string;
		};
		departureAirport: {
			uid: string;
			caption: string;
		};
		departureCity: {
			uid: string;
			caption: string;
		};
		aircraft: {
			uid: string;
			caption: string;
		};
		travelDuration: number;
		arrivalCity: {
			uid: string;
			caption: string;
		};
		arrivalDate: string;
		flightNumber: string;
		techStopInfos: [];
		departureDate: string;
		stops: 0;
		servicesDetails: {
			freeCabinLuggage: Record<string, string>;
			paidCabinLuggage: Record<string, string>;
			tariffName: string;
			fareBasis: {
				ADULT: string;
			};
			freeLuggage: {
				ADULT: {
					pieces: number;
					nil: boolean;
					unit: 'шт';
				};
			};
			paidLuggage: Record<string, string>;
		};
		airline: {
			uid: string;
			caption: string;
			airlineCode: string;
		};
		starting: boolean;
		arrivalAirport: {
			uid: string;
			caption: string;
		};
	}[];
}

export interface Price {
	total: {
		amount: string;
		currency: string;
		currencyCode: 'RUB';
	};
	totalFeeAndTaxes: {
		amount: string;
		currency: string;
		currencyCode: 'RUB';
	};
	rates: {
		totalUsd: {
			amount: string;
			currencyCode: 'USD';
		};
		totalEur: {
			amount: string;
			currencyCode: 'EUR';
		};
	};
	passengerPrices: [
		{
			total: {
				amount: string;
				currency: string;
				currencyCode: 'RUB';
			};
			passengerType: {
				uid: string;
				caption: string;
			};
			singlePassengerTotal: {
				amount: string;
				currency: string;
				currencyCode: 'RUB';
			};
			passengerCount: number;
			tariff: {
				amount: string;
				currency: string;
				currencyCode: 'RUB';
			};
			feeAndTaxes: {
				amount: string;
				currency: string;
				currencyCode: 'RUB';
			};
		},
	];
}

export interface Flight {
	carrier: {
		uid: string;
		airlineCode: string;
		caption: string;
	};
	exchange: {
		ADULT: {
			exchangeAfterDeparture: {
				amount: string;
				currency: string;
				currencyCode: string;
			};
			exchangeBeforeDeparture: {
				amount: string;
				currency: string;
				currencyCode: string;
			};
			exchangeableAfterDeparture: boolean;
			exchangeableBeforeDeparture: boolean;
		};
	};
	international: boolean;
	isTripartiteContractDiscountApplied: boolean;
	legs: Leg[];
	price: Price;
	refund: {
		ADULT: {
			refundableBeforeDeparture: false;
			refundableAfterDeparture: false;
		};
	};
	seats: [
		{
			count: number;
			type: {
				uid: 'ADULT';
				caption: 'Взрослый';
			};
		},
	];
	servicesStatuses: {
		baggage: {
			uid: 'OFF' | 'PAID' | 'FREE';
			caption: 'Недоступно' | 'Платно' | 'Бесплатно';
		};
		exchange: {
			uid: 'OFF' | 'PAID' | 'FREE';
			caption: 'Недоступно' | 'Платно' | 'Бесплатно';
		};
		refund: {
			uid: 'OFF' | 'PAID' | 'FREE';
			caption: 'Недоступно' | 'Платно' | 'Бесплатно';
		};
	};
}

export interface FlightResponse {
	flight: Flight;
	flightToken: string;
	hasExtendedFare: boolean;
}
