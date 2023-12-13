const fs = require("fs");

const filePath = (path) => {
    return path.slice(4, path.length);
};

const newFilePaths = (obj) => {
    if (obj && obj instanceof Array) {
        const temp = [];
        obj.forEach((element) => {
            temp.push(filePath(element.path));
        });
        return temp;
    } else {
        return filePath(obj.path);
    }
};

//delete image in the uploads folder
const removeFile = (path) => {
    return fs.unlink("./src/" + path, (err) => {
        if (err) {
            console.log(err?.message);
        } else {
            console.log("file deleted");
        }
    });
};

const deleteFiles = (obj) => {
    if (obj && obj instanceof Array) {
        obj.forEach((element) => {
            removeFile(element);
        });
    } else {
        removeFile(obj);
    }
};

module.exports = { newFilePaths, deleteFiles };
