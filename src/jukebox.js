const http = require('http');
const path = require('path');
const nodestatic = require('node-static');
const FileUtil = require('./utils/file.js');
const Logger = require('./utils/logger.js');

const IMAGE_DIR = './images';
const LOGGER_IGNORE_EXT = ['.css', '.js', '.jpg', '.jpeg', '.png', '.gif', '.ico'];

class Jukebox {
    constructor(config) {
        this.config = config;
    }

    init() {
        let config = this.config;
        let imagePath = path.resolve(config.musicPath, IMAGE_DIR);
        FileUtil.readDir(config.musicPath).then(songs => {
            FileUtil.writeData(songs, imagePath, config.data);
        }).catch(err => {
            throw (err);
        });
    }

    start() {
        this.init();
        let file = new nodestatic.Server('./public');
        http.createServer((req, res) => {
            req.addListener('end', () => {
            	this.log(req);
                file.serve(req, res);
            }).resume();
        }).listen(this.config.port);
        console.log('Server started on port ' + this.config.port + '...\n');
    }

    log(req) {
        let extname = path.extname(req.url);
        if (LOGGER_IGNORE_EXT.indexOf(extname) > -1) return;
        let ip = req.headers['x-forwarded-for'] ||
            req.connection.remoteAddress ||
            req.socket.remoteAddress ||
            req.connection.socket.remoteAddress;
        Logger.info(`${ip} - ${req.url}`);
    }
}

module.exports = Jukebox;
