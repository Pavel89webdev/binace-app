import { prepareInitialSnapshotData } from "./prepareInitialSnapshotData";

export const updateMarketDepth = ({
	initialUpdateId,
	updateIdLast,
	data,
	asks,
	bids,
}) => {
	if (updateIdLast <= initialUpdateId) {
		return {
			...data,
		};
	}

	return { ...data, ...prepareInitialSnapshotData(asks, bids) };
};
