import { eventsBus } from "../eventsBus";

const eventName = "updateMarket";

const subscribe = (callback) => eventsBus.subscribe(eventName, callback);
const emit = (data) => {
	return eventsBus.emit(eventName, data);
};

export const updateMarket = { subscribe, emit };
