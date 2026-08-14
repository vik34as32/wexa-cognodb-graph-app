# WEXA AI — CognoDB Graph Application

A full-stack graph database application built with **Next.js**, **TypeScript**, and **CognoDB**, using the official **Neo4j JavaScript Driver** and **openCypher**.

This project was developed as part of the **Wexa AI Take-Home Assignment**.

---

## 🚀 Overview

This application demonstrates how a graph database can be used to model and explore highly connected data.

The application provides a simple web interface that allows non-technical users to explore entities and their relationships through an intuitive UI.

The backend communicates directly with **CognoDB** using the official Neo4j JavaScript driver over the Bolt protocol.

---

## 🛠️ Technology Stack

### Frontend

* Next.js
* React
* TypeScript
* Tailwind CSS

### Database

* CognoDB
* openCypher
* Bolt protocol

### Database Driver

* Neo4j JavaScript Driver

### Development Tools

* Git
* GitHub
* VS Code
* Vercel

---

# 📊 Why a Graph Database?

The application uses a graph database because the core problem is based on **relationships and connections between entities**.

In a traditional relational database, exploring connected data often requires multiple tables and JOIN operations.

With a graph database, entities are represented as nodes and their connections are represented as relationships.

For example:

```text
Node → Relationship → Node → Relationship → Node
```

This makes multi-hop relationship queries easier to model and understand using Cypher.

The graph model is particularly useful for questions such as:

* What entities are connected to this entity?
* What are the indirect connections between two entities?
* Which entities are connected through multiple relationship types?
* What related entities can be reached within 2 or more hops?

These types of queries are naturally expressed using graph traversal.

---

# 🧩 Graph Data Model

The application uses labeled nodes, typed relationships, and properties.

### Nodes

The graph contains the following types of nodes:

```text
[Entity]
[Category]
[User]
```

> The final node types will depend on the selected application use case.

### Relationships

Relationships represent meaningful connections between nodes.

Example:

```text
(User)-[:CONNECTED_TO]->(Entity)

(Entity)-[:BELONGS_TO]->(Category)

(Entity)-[:RELATED_TO]->(Entity)
```

### Graph Diagram

The final graph data model diagram will be added here.

```text
             ┌──────────────┐
             │    User      │
             └──────┬───────┘
                    │
             CONNECTED_TO
                    │
                    ▼
             ┌──────────────┐
             │    Entity    │
             └──────┬───────┘
                    │
                RELATED_TO
                    │
                    ▼
             ┌──────────────┐
             │    Entity    │
             └──────┬───────┘
                    │
                BELONGS_TO
                    │
                    ▼
             ┌──────────────┐
             │   Category   │
             └──────────────┘
```

---

# 🏗️ Application Architecture

```text
┌───────────────────────────┐
│       Next.js UI          │
│                           │
│ React Components          │
│ Pages / Screens            │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│      Application Layer    │
│                           │
│ API Routes / Services     │
└─────────────┬─────────────┘
              │
              ▼
┌───────────────────────────┐
│    Neo4j JavaScript       │
│         Driver            │
└─────────────┬─────────────┘
              │
            Bolt
              │
              ▼
┌───────────────────────────┐
│        CognoDB            │
│                           │
│ Nodes + Relationships     │
└───────────────────────────┘
```

---

# 📁 Project Structure

```text
wexa-cognodb-graph-app/
│
├── app/
│   ├── api/
│   ├── page.tsx
│   ├── layout.tsx
│   └── globals.css
│
├── components/
│   ├── ...
│   └── ...
│
├── lib/
│   ├── cognodb.ts
│   └── ...
│
├── queries/
│   ├── ...
│   └── ...
│
├── scripts/
│   └── seed.ts
│
├── public/
│   └── screenshots/
│
├── .env.example
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

# ☁️ CognoDB Setup

## 1. Create a CognoDB Account

Create an account from the CognoDB Cloud console:

https://console.cognodb.com/signup

Create a free **c0 instance**.

The free instance is sufficient for the dataset used in this assignment.

---

## 2. Get Database Credentials

After creating the instance, CognoDB provides:

```text
URI
Username
Password
```

The URI has a format similar to:

```text
bolt+s://<instance-id>.databases.cognodb.cloud
```

The username is:

```text
cognodb
```

Save the generated password securely because CognoDB displays it only once.

---

# 🔐 Environment Variables

Create a `.env.local` file in the project root.

```env
COGNODB_URI=bolt+s://<instance-id>.databases.cognodb.cloud
COGNODB_USERNAME=cognodb
COGNODB_PASSWORD=<your-password>
```

Database credentials are never committed to GitHub.

The repository contains an `.env.example` file showing the required environment variables without exposing secrets.

---

# 📦 Installation

Clone the repository:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Move into the project:

```bash
cd wexa-cognodb-graph-app
```

Install dependencies:

```bash
npm install
```

---

# ▶️ Run the Application

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

# 🌱 Seed Data

The repository includes a seed script that creates realistic graph data inside CognoDB.

Run:

```bash
npm run seed
```

The seed script creates:

* Nodes
* Relationships
* Properties
* Sample graph data

The seed data is intentionally kept within the CognoDB free-tier limits.

---

# 🔎 Cypher Queries

The application uses parameterised Cypher queries through the official Neo4j JavaScript driver.

No user input is directly concatenated into Cypher queries.

---

## Basic Query

Example:

```cypher
MATCH (n:Entity)
RETURN n
LIMIT 20
```

---

## Relationship Query

Example:

```cypher
MATCH (a:Entity)-[r:RELATED_TO]->(b:Entity)
RETURN a, r, b
LIMIT 20
```

---

## Multi-Hop Query

The application includes multi-hop graph traversal.

Example:

```cypher
MATCH (a:User)-[:CONNECTED_TO]->(b:Entity)-[:RELATED_TO]->(c:Entity)
RETURN a, b, c
LIMIT 20
```

This query traverses the graph through multiple relationships.

---

## Graph-Specific Query

The application also includes queries where graph traversal provides a more natural solution than repeatedly joining relational tables.

Example:

```cypher
MATCH path = (a:Entity)-[*2..3]-(b:Entity)
WHERE a.id = $entityId
RETURN path
LIMIT 20
```

The actual production queries used by the application are documented in the `queries/` directory.

---

# 🔒 Parameterised Queries

All dynamic values are passed as query parameters.

Example:

```ts
const result = await session.run(
  `
  MATCH (n:Entity {id: $entityId})
  RETURN n
  `,
  {
    entityId,
  }
);
```

This avoids string-concatenated Cypher and keeps database queries safer and easier to maintain.

---

# ⚠️ Error Handling

The application handles database failures gracefully.

Examples include:

* CognoDB unavailable
* Invalid database credentials
* Query failures
* Empty results
* Invalid requests
* Loading states
* Unexpected server errors

The UI displays an appropriate error or empty state instead of exposing raw database errors to the user.

---

# 🎨 UI / UX

The application is designed for non-technical users.

The UI includes:

* Clear navigation
* Responsive layout
* Loading states
* Empty states
* Error states
* Search/filter interactions
* Readable typography
* Relationship exploration
* Clean visual hierarchy

The goal is to make graph data understandable without requiring users to know Cypher or graph databases.

---

# 📸 Screenshots

Screenshots of the completed application will be added below.

### Dashboard

> Screenshot will be added here.

### Graph Exploration

> Screenshot will be added here.

### Entity Details

> Screenshot will be added here.

---

# 🌐 Live Demo

**Hosted Application:**

> Demo URL will be added after deployment.

---

# 🎥 Screen Recording

A short screen recording demonstrating the complete application workflow will be provided with the submission.

The recording demonstrates:

1. Application overview
2. Main user flow
3. Graph exploration
4. Multi-hop relationship query
5. Data displayed from CognoDB

---

# 🧪 Development

Run the development server:

```bash
npm run dev
```

Build the application:

```bash
npm run build
```

Run the production server:

```bash
npm start
```

---

# 📋 Assignment Requirements Covered

| Requirement                      | Status |
| -------------------------------- | ------ |
| CognoDB as graph database        | ✅      |
| Neo4j official driver            | ✅      |
| Thoughtful graph data model      | 🔄     |
| Typed relationships              | 🔄     |
| Realistic seed data              | 🔄     |
| Seed script                      | 🔄     |
| Multi-hop Cypher query           | 🔄     |
| Relationally awkward graph query | 🔄     |
| Parameterised queries            | ✅      |
| Functional web application       | 🔄     |
| Loading state                    | 🔄     |
| Empty state                      | 🔄     |
| Error handling                   | 🔄     |
| Environment variables            | ✅      |
| README documentation             | 🔄     |
| Hosted demo                      | 🔄     |
| Screenshots                      | 🔄     |
| Screen recording                 | 🔄     |

> Items marked 🔄 will be completed and updated as the application is implemented.

---

# 👨‍💻 Author

**Vikas Kumar**

Full Stack Developer
React.js | Next.js | Node.js | TypeScript

---

# 📄 WEXA AI Take-Home Assignment

This project was created for the:

**Wexa AI — Candidate Take-Home Assignment**

Assignment:

**Build a Graph Database Application using CognoDB**
