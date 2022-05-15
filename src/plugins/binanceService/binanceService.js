const WS_BASE = "wss://stream.binance.com:9443/stream?streams=BTCUSDT";

const NONE_STATUS = "none";

export const binanceService = {
	socket: null,
	status: NONE_STATUS,
	subscribe() {
		if (this.status === NONE_STATUS) {
			this.socket = new WebSocket(WS_BASE);
			this.socket.onopen = (e) => {
				this.status = e.type || NONE_STATUS;
				this.socket.send(
					JSON.stringify({
						method: "SUBSCRIBE",
						params: ["btcusdt@depth"],
						id: 1,
					})
				);
			};
			this.socket.onmessage = (e) => {
				console.log(JSON.parse(e.data));
			};
		}
	},
	unsubscribe() {
		this.socket.send(
			JSON.stringify({
				method: "UNSUBSCRIBE",
				params: ["btcusdt@depth"],
				id: 1,
			})
		);
	},
};
