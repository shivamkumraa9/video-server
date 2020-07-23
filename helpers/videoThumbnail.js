const { spawn } = require('child_process');
const { createWriteStream } = require('fs');

const VideoDetails = require('../db/models').Upload;
const port = 3333

const ffmpegPath = './ddlj';
const width = 256;
const height = 144;

const generateThumbnail = (target, title, username) => {
  title = title.replace(/.mov|.mpg|.mpeg|.mp4|.wmv|.avi/gi, '');
const videoDetails = new VideoDetails({
    uploader_name: username,
    upload_title: title,
    video_path: target,
  });
  videoDetails
    .save()
}

module.exports = {
  generateThumbnail: generateThumbnail
}
