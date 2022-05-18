# Binance App (in progress)

## What need to do:

SPA with some core, with possibility to add some plugins in the core, plugins and React components with this plugins should upload asynchronous.

For example I have a binance API, and I'll use it in this project.

API here: https://github.com/binance/binance-spot-api-docs/blob/master/web-socket-streams.md#how-to-manage-a-local-order-book-correctly

1. Fist plugin is event bus.
2. Second plugin is getSnapshot method to event bus of market depth, for example bitcoin-USDT currency level.
3. Third plugin is a getUpdateMarket method to event bus. It's work by web-socket-streams

What is already done:

-   [x] Empty SPA with router (react-router-dom);
-   [x] Some routes, every route component in own chunk;
-   [x] empty core;
-   [x] event bus with asynchronous uploading using webpack chunk and dynamic import;
-   [x] getSnapshot using webpack chunk and dynamic import;
-   [x] updateMarketDepth using webpack chunk and dynamic import;

What need to do, or solve:

-   [ ] kill websocket instance when it not need yet.
-   [ ] make empty first page and describe on it about app.
-   [ ] add some virtual list to perform to render big list of market depth.
-   [ ] deploy on Vercel
