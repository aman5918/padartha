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
1. **Dravya (Substance / Substratum)** $\rightarrow$ Knowledge Graph Entity / Node / Object Instance
2. **Guṇa (Quality / Attribute)** $\rightarrow$ Static Inherent Property Vector / Datatype Literal
3. **Karma (Action / Dynamic Motion)** $\rightarrow$ State Transitions / Executable Methods
4. **Sāmānya (Universal / Genus)** $\rightarrow$ Class Taxonomy & Inheritance (`rdfs:subClassOf`)
5. **Viśeṣa (Particularity)** $\rightarrow$ Unique Instance Identifiers (UUIDs / Primary Keys)
6. **Samavāya (Inseparable Inherence)** $\rightarrow$ Axiomatic Inseparable Edge (`hasInherentProperty`)
7. **Abhāva (Absence / Non-Being)** $\rightarrow$ Negation-as-Absence / Disjoint Class Axioms (`owl:disjointWith`)

---

## 🚀 Quick Start Guide

### 1. Requirements
- Node.js (v18+)
- npm (v9+)
- *(Optional)* MongoDB running on `mongodb://127.0.0.1:27017` (The app includes a zero-config smart store fallback so it runs instantly even without MongoDB installed!).

### 2. Launching the App
In the project directory `padartha-ontology-mern`:

```bash
# Option A: Start both servers simultaneously with 1 command
npm start

# Option B: Run via Windows batch launcher
Double-click start-dev.bat

# Option C: Start independently
# Terminal 1 (Backend - Port 5000):
cd backend
npm start

# Terminal 2 (Frontend - Port 3000):
cd frontend
npm run dev
```

Open your browser at **`http://localhost:3000`** to interact with the full web app!

---

## 🛠️ Architecture & Features

### 1. 🧠 Interactive Semantic Reasoner Studio (Algorithm 4.3)
- Query inherent Guṇas (Samavāya) and inherited class traits (Sāmānya).
- Mathematical set notation resolution: $G(e) = \text{Direct}(e) \cup \text{Inherited}(\text{Class}(e))$.
- Dynamic actions (Karma) execution.
- Multi-tier class taxonomy navigation: $\text{Instance} \rightarrow \text{Class} \rightarrow \text{Dravya} \rightarrow \text{Bhāva} \rightarrow \text{Sattā}$.

### 2. 🌐 Interactive 2D Knowledge Graph Visualizer
- Visualizes Subject-Predicate-Object triples.
- Interactive pan, zoom, node drag, search filter, and ontological node inspector.

### 3. 🛠️ Custom Dravya Instantiation Studio (Algorithm 4.2)
- Form to instantiate new substance nodes with custom properties.
- Dynamic Viśeṣa UUID generator (`dravya-07-xxx`).
- Stored directly into the backend database.

### 4. 🚫 Abhāva Negation & Non-Being Lab
- Implements the 4 classical negation types:
  - **Prāgabhāva:** Prior absence before production
  - **Pradhvaṃsābhāva:** Posterior absence after destruction
  - **Atyantābhāva:** Absolute absence across past, present, and future
  - **Anyonyābhāva:** Mutual difference ($A \neq B$)

### 5. 📋 Chapter 6 Automated Test Suite
- In-app test runner executing TC01 through TC08 with real-time pass/fail validation.

### 6. 📑 Academic Dissertation Viewer & Exporter
- Interactive reader for Chapters 1 through 8.
- 1-click export of the knowledge base into **JSON-LD** and **RDF / Turtle (`.ttl`)** format.

---

## 📡 REST API Reference

| Endpoint | Method | Description |
|---|---|---|
| `/api/ontology/overview` | `GET` | Knowledge base statistics and project metadata |
| `/api/ontology/classes` | `GET` | 9 Canonical Dravya classes |
| `/api/ontology/gunas` | `GET` | 24 Canonical Guṇas with CS property types |
| `/api/ontology/karmas` | `GET` | 5 Dynamic motion categories |
| `/api/ontology/abhavas` | `GET` | 4 Abhāva negation axioms |
| `/api/ontology/entities` | `GET` | Fetch all Dravya instances |
| `/api/ontology/entities` | `POST` | Instantiate a new Dravya node |
| `/api/ontology/entities/:id` | `DELETE` | Remove a Dravya instance |
| `/api/reasoner/query` | `POST` | Execute Semantic Reasoner (Algorithm 4.3) |
| `/api/reasoner/abhava` | `POST` | Execute Abhāva verification proof |
| `/api/graph` | `GET` | Knowledge graph nodes and edges for visualization |
| `/api/tests/run` | `GET` | Run test suite (TC01–TC08) |
| `/api/export/:format` | `GET` | Export ontology as JSON or Turtle RDF |
