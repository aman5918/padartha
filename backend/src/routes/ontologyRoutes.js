const express = require("express");
const router = express.Router();
const ReasonerService = require("../services/reasonerService");
const DravyaEntity = require("../models/DravyaEntity");
const { CANONICAL_CLASSES, CANONICAL_GUNAS_24, CANONICAL_KARMAS_5, CANONICAL_ABHAVAS_4, PREDEFINED_TEST_CASES } = require("../data/canonicalOntology");
const { getMongoStatus } = require("../config/db");

// 1. Overview & Metadata
router.get("/ontology/overview", async (req, res) => {
  try {
    const entities = await DravyaEntity.find();
    res.json({
      success: true,
      project: {
        title: "Padārtha Ontology (Nyāya) as Knowledge Representation Model",
        shortTitle: "Padārtha KR Engine (Nyāya-Vaiśeṣika)",
        type: "IKSCS B.Sc. (Computer Science) SEM V Project",
        institution: "Department of Computer Science, Rizvi College of Arts, Science and Commerce",
        university: "University of Mumbai",
        authors: [
          { name: "Aman Yadav", rollNo: 68 },
          { name: "Tanish Gupta", rollNo: 17 }
        ],
        mentors: {
          guide: "Prof. Javed Pathan (Assistant Professor)",
          hod: "Prof. Arif Patel (Head of Department)",
          principal: "Dr. Anjum Ara Ahmad"
        },
        academicYear: "2026-2027"
      },
      stats: {
        totalPadarthas: 7,
        bhavaCategories: 6,
        abhavaCategories: 1,
        canonicalDravyas: Object.keys(CANONICAL_CLASSES).length,
        canonicalGunas: CANONICAL_GUNAS_24.length,
        canonicalKarmas: CANONICAL_KARMAS_5.length,
        canonicalAbhavas: CANONICAL_ABHAVAS_4.length,
        activeDravyaEntities: entities.length,
        mongoConnected: getMongoStatus()
      },
      padarthaTaxonomy: {
        root: "Padārtha (All Knowable Reality)",
        realms: [
          {
            name: "Bhāva (Positive Existence)",
            categories: ["Dravya (Substance)", "Guṇa (Quality)", "Karma (Action)", "Sāmānya (Universal)", "Viśeṣa (Particular)", "Samavāya (Inseparable Inherence)"]
          },
          {
            name: "Abhāva (Absence / Negation)",
            categories: ["Prāgabhāva (Prior Absence)", "Pradhvaṃsābhāva (Destruction)", "Atyantābhāva (Absolute Absence)", "Anyonyābhāva (Mutual Difference)"]
          }
        ]
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Classes & Primitives
router.get("/ontology/classes", (req, res) => {
  res.json({ success: true, classes: CANONICAL_CLASSES });
});

router.get("/ontology/gunas", (req, res) => {
  res.json({ success: true, gunas: CANONICAL_GUNAS_24 });
});

router.get("/ontology/karmas", (req, res) => {
  res.json({ success: true, karmas: CANONICAL_KARMAS_5 });
});

router.get("/ontology/abhavas", (req, res) => {
  res.json({ success: true, abhavas: CANONICAL_ABHAVAS_4 });
});

// 3. Dravya Entities CRUD
router.get("/ontology/entities", async (req, res) => {
  try {
    const entities = await DravyaEntity.find();
    res.json({ success: true, count: entities.length, entities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/ontology/entities", async (req, res) => {
  try {
    const { name, samanya, inherentGunas, karmas, description } = req.body;
    const result = await ReasonerService.instantiateDravya({
      name,
      samanya,
      inherentGunas,
      karmas,
      description
    });
    res.status(201).json({ success: true, ...result });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
});

router.delete("/ontology/entities/:id", async (req, res) => {
  try {
    const result = await DravyaEntity.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ success: false, message: "Entity not found" });
    }
    res.json({ success: true, message: `Entity '${req.params.id}' deleted successfully.` });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.post("/ontology/entities/reset", async (req, res) => {
  try {
    const restored = await DravyaEntity.resetPredefined();
    res.json({ success: true, message: "Restored canonical pre-seeded entities successfully.", count: restored.length });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Semantic Reasoner & Inference Query (Algorithm 4.3)
router.post("/reasoner/query", async (req, res) => {
  try {
    const { entityId, queryGoal, targetProperty, abhavaType, targetEntityId } = req.body;
    const result = await ReasonerService.executeReasoner({
      entityId,
      queryGoal,
      targetProperty,
      abhavaType,
      targetEntityId
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 5. Abhāva Negation Engine Dedicated Query
router.post("/reasoner/abhava", async (req, res) => {
  try {
    const { entityId, targetProperty, abhavaType, targetEntityId } = req.body;
    const result = await ReasonerService.executeReasoner({
      entityId,
      queryGoal: "ABHAVA",
      targetProperty,
      abhavaType,
      targetEntityId
    });
    res.json(result);
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 6. Knowledge Graph
router.get("/graph", async (req, res) => {
  try {
    const graphData = await ReasonerService.getKnowledgeGraph();
    res.json({ success: true, ...graphData });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Test Cases Runner
router.get("/tests/run", async (req, res) => {
  try {
    const testReport = await ReasonerService.runAllTestCases();
    res.json({ success: true, ...testReport });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/tests/definitions", (req, res) => {
  res.json({ success: true, testCases: PREDEFINED_TEST_CASES });
});

// 8. Export Ontology (JSON / Turtle / OWL)
router.get("/export/:format?", async (req, res) => {
  try {
    const format = (req.params.format || req.query.format || "json").toLowerCase();
    const data = await ReasonerService.exportOntology(format);

    if (format === "turtle" || format === "rdf" || format === "ttl") {
      res.setHeader("Content-Type", "text/turtle");
      res.setHeader("Content-Disposition", "attachment; filename=padartha_ontology.ttl");
      return res.send(data);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
