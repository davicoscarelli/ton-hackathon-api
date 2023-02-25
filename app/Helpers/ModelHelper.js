"use strict";

class ModelHelper {
  fillable(data, fields) {
    if (!fields || !fields.length) return {};

    const filled = {};
    for (const field of fields) {
      if (!data[field]) continue;
      filled[field] = data[field];
    }

    return filled;
  }
}

module.exports = new ModelHelper();
