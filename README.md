# Padārtha Ontology (Nyāya) as Knowledge Representation Model

## Full-Stack MERN Application

**An Indian Knowledge Systems (IKS) & Computer Science Project**

*Department of Computer Science, Rizvi College of Arts, Science and Commerce (Affiliated to University of Mumbai)*

*Academic Year: 2026–2027 | B.Sc. (Computer Science) SEM V*

---

### 👨‍🎓 Project Credits & Authors

- **Aman Yadav** — Seat No / Roll No: 68
- **Tanish Gupta** — Seat No / Roll No: 17
- **Project Guide:** Prof. Javed Pathan (Assistant Professor)
- **Head of Department:** Prof. Arif Patel
- **Principal:** Dr. Anjum Ara Ahmad

---

## 📖 Overview

This project operationalizes the classical **7 Padārthas (Categories of Knowable Reality)** from Sage Gautama's *Nyāya Sūtra*, Sage Kaṇāda's *Vaiśeṣika Sūtra*, and Annambhaṭṭa's *Tarkasaṃgraha* into a full-stack computational **Knowledge Representation (KR)** and **Semantic Inference Engine**.

The system translates philosophical ontologies into modern Computer Science primitives:

1. **Dravya (Substance / Substratum)** → Knowledge Graph Entity / Node / Object Instance
2. **Guṇa (Quality / Attribute)** → Static Inherent Property Vector / Datatype Literal
3. **Karma (Action / Dynamic Motion)** → State Transitions / Executable Methods
4. **Sāmānya (Universal / Genus)** → Class Taxonomy & Inheritance (`rdfs:subClassOf`)
5. **Viśeṣa (Particularity)** → Unique Instance Identifiers (UUIDs / Primary Keys)
6. **Samavāya (Inseparable Inherence)** → Axiomatic Inseparable Edge (`hasInherentProperty`)
7. **Abhāva (Absence / Non-Being)** → Negation-as-Absence / Disjoint Class Axioms (`owl:disjointWith`)

---

## 🚀 Quick Start Guide

### 1. Requirements

- Node.js (v18+)
- npm (v9+)
- **(Optional)** MongoDB running on `mongodb://127.0.0.1:27017`  
  The app includes a zero-config smart store fallback so it runs instantly even without MongoDB installed.

### 2. Launching the App

In the project directory `padartha-ontology-mern`:

```bash
# Option A: Start both servers simultaneously with 1 command
npm start

# Option B: Run via Windows batch launcher
Double-click start-dev.bat

# Option C: Start independently

# Terminal 1 (Backend - Port 5000)
cd backend
npm start

# Terminal 2 (Frontend - Port 3000)
cd frontend
npm run dev