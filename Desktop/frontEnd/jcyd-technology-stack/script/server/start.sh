# supervisor ./dist/app.js
export NODE_ENV='development' && ts-node-dev --respawn --transpile-only src/app.js