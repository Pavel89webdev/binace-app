import { eventsBus } from "../eventsBus";

const eventName = "getSnapshot";

const subscribe = (callback) => eventsBus.subscribe(eventName, callback);
const emit = (data) => {
	return eventsBus.emit(eventName, data);
};

export const getSnapshot = { subscribe, emit };
