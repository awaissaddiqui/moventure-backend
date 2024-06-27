/* eslint-disable no-param-reassign */

/**
 * A mongoose schema plugin which applies the following in the toJSON transform call:
 *  - removes __v, createdAt, updatedAt, and any path that has private: true
 *  - replaces _id with id
 */

const deleteAtPath = (object, path, index) => {
    if (index === path.length - 1) {
        delete object[path[index]];
        return;
    }
    deleteAtPath(object[path[index]], path, index + 1);
};

const toJSON = (schema) => {
    let transform;
    if (schema.options.toJSON && schema.options.toJSON.transform) {
        transform = schema.options.toJSON.transform;
    }

    schema.options.toJSON = Object.assign(schema.options.toJSON || {}, {
        transform(document_, returnValue, options) {
            for (const path of Object.keys(schema.paths)) {
                if (schema.paths[path].options && schema.paths[path].options.private) {
                    deleteAtPath(returnValue, path.split('.'), 0);
                }
            }

            returnValue.id = returnValue._id.toString();
            delete returnValue._id;
            delete returnValue.__v;
            delete returnValue.createdAt;
            delete returnValue.updatedAt;
            if (transform) {
                return transform(document_, returnValue, options);
            }
        },
    });
};

export { toJSON };