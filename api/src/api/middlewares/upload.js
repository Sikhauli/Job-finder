const multer = require("multer");

const uploadFiles = (path) => {
    const fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./src/uploads/${path}`);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + file.originalname);
        },
    });

    const fileLimits = {
        fileSize: 1024 * 1024 * 5, //only accept up to 5MB file size
    };

    return multer({ storage: fileStorage, limits: fileLimits });
};

module.exports = uploadFiles;
