export const prepareInitialSnapshotData = (asks, bids) => {
	const result = {};

	const initPriceData = { ask: "", bid: "" };

	for (let i = 0; i < asks.length; i++) {
		const price = asks[i][0];
		const quantity = asks[i][1];

		if (!result[price]) {
			result[price] = { ...initPriceData };
		}
		result[price].ask = quantity;
	}

	for (let i = 0; i < bids.length; i++) {
		const price = bids[i][0];
		const quantity = bids[i][1];

		if (!result[price]) {
			result[price] = { ...initPriceData };
		}
		result[price].bid = quantity;
	}

	return result;
};
