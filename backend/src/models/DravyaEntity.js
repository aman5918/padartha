const mongoose = require("mongoose");
const { getMongoStatus } = require("../config/db");
const { INITIAL_ENTITIES } = require("../data/canonicalOntology");

// Mongoose Schema
const dravyaEntitySchema = new mongoose.Schema({
  viseshaId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  samanya: { type: String, required: true },
  inherentGunas: [{ type: String }],
  karmas: [{ type: String }],
  description: { type: String, default: "" },
  isPredefined: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

let MongooseModel = null;
try {
  MongooseModel = mongoose.model("DravyaEntity", dravyaEntitySchema);
} catch (e) {
  MongooseModel = mongoose.model("DravyaEntity");
}

// In-Memory Store
let memoryStore = JSON.parse(JSON.stringify(INITIAL_ENTITIES));

// Auto-seed helper
const ensureSeeded = async () => {
  if (getMongoStatus()) {
    try {
      const count = await MongooseModel.countDocuments();
      if (count === 0) {
        await MongooseModel.insertMany(INITIAL_ENTITIES);
      }
    } catch (e) {
      // Ignored
    }
  }
};

const DravyaEntity = {
  ensureSeeded,

  find: async (filter = {}) => {
    if (getMongoStatus()) {
      try {
        await ensureSeeded();
        const results = await MongooseModel.find(filter).lean();
        if (results && results.length > 0) return results;
      } catch (e) {
        console.warn("Mongo find fallback to memory:", e.message);
      }
    }
    return memoryStore.filter(item => {
      if (filter.viseshaId && item.viseshaId !== filter.viseshaId) return false;
      if (filter.samanya && item.samanya !== filter.samanya) return false;
      return true;
    });
  },

  findOne: async (filter = {}) => {
    if (getMongoStatus()) {
      try {
        await ensureSeeded();
        const result = await MongooseModel.findOne(filter).lean();
        if (result) return result;
      } catch (e) {
        console.warn("Mongo findOne fallback to memory:", e.message);
      }
    }
    return memoryStore.find(item => {
      if (filter.viseshaId && item.viseshaId === filter.viseshaId) return true;
      if (filter.name && item.name.toLowerCase() === filter.name.toLowerCase()) return true;
      return false;
    }) || null;
  },

  create: async (data) => {
    const item = {
      viseshaId: data.viseshaId,
      name: data.name,
      samanya: data.samanya,
      inherentGunas: data.inherentGunas || [],
      karmas: data.karmas || [],
      description: data.description || "",
      isPredefined: !!data.isPredefined,
      createdAt: new Date().toISOString()
    };

    if (getMongoStatus()) {
      try {
        const doc = await MongooseModel.create(item);
        return doc.toObject();
      } catch (e) {
        console.warn("Mongo create fallback to memory:", e.message);
      }
    }

    memoryStore.push(item);
    return item;
  },

  findByIdAndDelete: async (viseshaId) => {
    if (getMongoStatus()) {
      try {
        await MongooseModel.findOneAndDelete({ viseshaId });
      } catch (e) {
        console.warn("Mongo delete fallback to memory:", e.message);
      }
    }
    const idx = memoryStore.findIndex(i => i.viseshaId === viseshaId);
    if (idx !== -1) {
      const removed = memoryStore.splice(idx, 1);
      return removed[0];
    }
    return null;
  },

  resetPredefined: async () => {
    memoryStore = JSON.parse(JSON.stringify(INITIAL_ENTITIES));
    if (getMongoStatus()) {
      try {
        await MongooseModel.deleteMany({});
        await MongooseModel.insertMany(INITIAL_ENTITIES);
      } catch (e) {
        console.warn("Mongo reset fallback to memory:", e.message);
      }
    }
    return memoryStore;
  }
};

module.exports = DravyaEntity;
