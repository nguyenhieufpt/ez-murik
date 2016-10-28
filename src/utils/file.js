const path = require('path');
const fs = require('fs');
const mm = require('musicmetadata');
const Common = require('./common.js');

module.exports = class File {
    static readDir(dir) {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, files) => {
                if (err) reject(err);

                let promises = [];
                files.forEach(file => {
                    if (path.extname(file) === '.mp3') {
                        promises.push(this.readMetadata(path.resolve(dir, file)));
                    }
                });
                Promise.all(promises).then(songs => {
                    resolve(songs);
                }).catch(err => {
                    reject(err);
                })
            });
        });
    }

    static readMetadata(file) {
        return new Promise((resolve, reject) => {
            mm(fs.createReadStream(file), { duration: true }, (err, data) => {
                if (err) {
                    console.error(err);
                    resolve(null);
                }
                data.fileName = path.basename(file, path.extname(file));
                if (!data.title) {
                    data.title = data.fileName;
                }

                resolve(data);
            });
        });
    }

    static writeData(datas, imagePath, outputPath) {
        if (!fs.existsSync(imagePath)) {
            fs.mkdirSync(imagePath);
        }
        let songs = [];
        for (let data of datas) {
            let song = {};
            song.title = data.title;
            song.artist = data.artist.join(', ');
            song.album = data.album;
            song.genre = data.genre.join(', ');
            song.fileName = data.fileName;
            song.duration = data.duration;
            if (data.picture.length > 0) {
                let picture = data.picture[0];
                let fileName = songs.length + '.' + picture.format;
                fs.writeFileSync(path.resolve(imagePath, fileName), picture.data);
                song.picture = fileName;
            }
            songs.push(song);
        }
        fs.writeFileSync(outputPath, JSON.stringify(songs));
    }
}
