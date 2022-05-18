export const prepareInitialSnapshotData = (asks, bids) => {
	const result = {};

	const initPriceData = { ask: "", bid: "" };

	for (let i = 0; i < asks.length; i++) {
		const price = asks[i][0];
		const quantity = asks[i][1];
		const quantityNum = Number(quantity);

		if (!result[price] && quantityNum) {
			result[price] = { ...initPriceData };
		}
		if (result[price] && !quantityNum) {
			const bid = Number(result[price].bid);

			if (!bid) delete result[price];
		}

		if (result[price]) {
			result[price].ask = quantity;
		}
	}

	for (let i = 0; i < bids.length; i++) {
		const price = bids[i][0];
		const quantity = bids[i][1];
		const quantityNum = Number(quantity);

		if (!result[price] && quantityNum) {
			result[price] = { ...initPriceData };
		}

		if (result[price] && !quantityNum) {
			const ask = Number(result[price].ask);

			if (!ask) delete result[price];
			continue;
		}

		if (result[price]) {
			result[price].bid = quantity;
		}
	}

	return result;
};
