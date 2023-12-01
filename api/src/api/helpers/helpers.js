const mongoose = require("mongoose");

const routeErrors = (res, error, msg) => {
    if (error?.code === 11000) {
        return res.status(400).send("Email already exists.");
    } else if (error?.message) {
        return res.status(401).send(error.message);
    } else {
        return res.status(401).send(msg);
    }
};

const isValidDocument = async (res, ids) => {
    for (const id in ids) {
        //check if the document exists in the collection
        if (!mongoose.Types.ObjectId.isValid(id))
            return res.status(406).send(`${id} does not exist.`);
    }
};

const documentExists = async (res, itemId, document) => {
    try {
        //check if the document exists in the collection
        if (!mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(406).send(`${itemId} does not exist.`);
        }

        if (document) {
            const exists = await document.findOne({ _id: itemId });
            if (!exists) {
                return res.status(406).send(`${itemId} does not exist`);
            }
            return await exists; //return the document
        }
    } catch (error) {
        routeErrors(res, error, "Unable to find the information in our system.");
    }
};

module.exports = {
    routeErrors,
    isValidDocument,
    documentExists,
};
