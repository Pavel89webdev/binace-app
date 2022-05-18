import { WS_BASE, WS_METHODS } from "../../consts";

export class UpdateMarketService {
	constructor(symbol, params, emitter) {
		if (!UpdateMarketService.openedWS[symbol]) {
			this.socket = null;
			this.url = `${WS_BASE}${symbol}`;
			this.emitter = emitter;
			this.params = params;
		} else {
			return UpdateMarketService.openedWS[symbol];
		}
	}

	static openedWS = {};

	startWS() {
		if (!UpdateMarketService.openedWS[this.symbol]) {
			UpdateMarketService.openedWS[this.symbol] = true;

			this.socket = new WebSocket(this.url);
			this.socket.onopen = (e) => {
				this.socket.send(
					JSON.stringify({
						method: WS_METHODS.SUBSCRIBE,
						params: this.params,
						id: 1,
					})
				);
			};
			this.socket.onmessage = (e) => {
				const preparedData = JSON.parse(e.data);
				this.emitter(preparedData);
			};
		}
	}

	stopWS() {
		// когда это вызывать?
		this.socket.send(
			JSON.stringify({
				method: WS_METHODS.UNSUBSCRIBE,
				params: this.params,
				id: 1,
			})
		);
		delete this.openedWS[this.symbol];
	}
}
