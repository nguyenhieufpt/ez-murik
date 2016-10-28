const path = require('path');
const fs = require('fs');
const JukeBox = require('./src/jukebox.js');

const DEFAULT_CONFIG = Object.freeze({
    musicPath: path.resolve(__dirname, './music'),
    data: path.resolve(__dirname, './data.json'),
    port: 8080
});
const CONFIG_PATH = path.resolve(__dirname, './config.json');

// Read config
let customConfig = {};
if (fs.existsSync(CONFIG_PATH)) {
    let content = fs.readFileSync(CONFIG_PATH).toString();
    customConfig = JSON.parse(content);
}
let config = Object.assign({}, DEFAULT_CONFIG, customConfig);

let app = new JukeBox(config);

app.start();