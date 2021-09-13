# Oblivion save reader

## To use on-demand:

1. Download latest release
2. Open `test.html` in browser
3. Drag and drop `.ess` file onto page

## To build from source:

1. Clone repo
2. `npm install`
3. `npm build-prod && npm build-js`

## To use websocket server:

1. Follow steps to build from source
2. `npm run server`
3. Open test.html in browser, append `?WS=ws://127.0.0.1:8080/` to URL. Example: `file:///C:/Users/valar/Source/oblivion-save-reader/test.html?WS=ws://127.0.0.1:8080/`