const SNAPSHOT_URL_BASE = "https://api.binance.com/api/v3/depth";

//'https://api.binance.com/api/v3/depth?symbol=BNBBTC&limit=1000'

export class GetSnapshotService {
	constructor(symbol, limit, emitter) {
		this.symbol = symbol;
		this.limit = limit || 500;
		this.loading = false;
		this.emitter = emitter;
		this.url = `${SNAPSHOT_URL_BASE}?symbol=${symbol}&limit=${limit}`;
	}

	getSnapshot() {
		if (!this.loading) {
			this.loading = true;

			fetch(this.url)
				.then((data) => data.json())
				.then((data) => {
					const preparedData = data;
					this.emitter(preparedData);
					this.loading = false;
				});
		}
	}
}
