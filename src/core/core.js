export const plugins = {};

export const addPlugin = (pluginName, plugin) => {
	if (!plugins[pluginName]) plugins[pluginName] = plugin;
};

export const deletePlugin = (pluginName) => {
	if (plugins[pluginName]) delete plugins[pluginName];
};
