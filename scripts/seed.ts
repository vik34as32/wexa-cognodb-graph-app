import { loadEnvConfig } from "@next/env";
import neo4j from "neo4j-driver";

loadEnvConfig(process.cwd());

const uri = process.env.COGNODB_URI!;
const username = process.env.COGNODB_USERNAME!;
const password = process.env.COGNODB_PASSWORD!;

if (!uri || !username || !password) {
  throw new Error("CognoDB environment variables are missing.");
}

const driver = neo4j.driver(
  uri,
  neo4j.auth.basic(username, password)
);

const developers = [
  {
    id: "dev-01",
    name: "Vikas Kumar",
    experience: 4.3,
    role: "Full Stack Developer",
  },
  {
    id: "dev-02",
    name: "Rahul Sharma",
    experience: 5.1,
    role: "Backend Developer",
  },
  {
    id: "dev-03",
    name: "Priya Verma",
    experience: 3.8,
    role: "Frontend Developer",
  },
  {
    id: "dev-04",
    name: "Amit Singh",
    experience: 6.2,
    role: "Full Stack Developer",
  },
  {
    id: "dev-05",
    name: "Neha Gupta",
    experience: 4.7,
    role: "Frontend Developer",
  },
  {
    id: "dev-06",
    name: "Arjun Mehta",
    experience: 7.1,
    role: "Backend Developer",
  },
  {
    id: "dev-07",
    name: "Sneha Kapoor",
    experience: 3.5,
    role: "React Developer",
  },
  {
    id: "dev-08",
    name: "Rohit Verma",
    experience: 5.8,
    role: "Node.js Developer",
  },
  {
    id: "dev-09",
    name: "Ananya Sharma",
    experience: 4.2,
    role: "Full Stack Developer",
  },
  {
    id: "dev-10",
    name: "Karan Malhotra",
    experience: 8.3,
    role: "Senior Software Engineer",
  },
  {
    id: "dev-11",
    name: "Pooja Singh",
    experience: 2.9,
    role: "Frontend Developer",
  },
  {
    id: "dev-12",
    name: "Manish Kumar",
    experience: 6.7,
    role: "Backend Developer",
  },
  {
    id: "dev-13",
    name: "Riya Agarwal",
    experience: 4.9,
    role: "Full Stack Developer",
  },
  {
    id: "dev-14",
    name: "Akash Yadav",
    experience: 5.4,
    role: "DevOps Engineer",
  },
  {
    id: "dev-15",
    name: "Simran Kaur",
    experience: 3.2,
    role: "React Developer",
  },
  {
    id: "dev-16",
    name: "Nitin Joshi",
    experience: 7.8,
    role: "Software Engineer",
  },
  {
    id: "dev-17",
    name: "Kavya Mehta",
    experience: 4.1,
    role: "Frontend Developer",
  },
  {
    id: "dev-18",
    name: "Saurabh Jain",
    experience: 6.4,
    role: "Full Stack Developer",
  },
  {
    id: "dev-19",
    name: "Divya Sharma",
    experience: 3.7,
    role: "Backend Developer",
  },
  {
    id: "dev-20",
    name: "Varun Bhatia",
    experience: 5.9,
    role: "Cloud Engineer",
  },
  {
    id: "dev-21",
    name: "Megha Gupta",
    experience: 4.5,
    role: "Full Stack Developer",
  },
  {
    id: "dev-22",
    name: "Aditya Raj",
    experience: 8.1,
    role: "Senior Backend Developer",
  },
  {
    id: "dev-23",
    name: "Isha Verma",
    experience: 2.8,
    role: "Frontend Developer",
  },
  {
    id: "dev-24",
    name: "Yash Sharma",
    experience: 5.2,
    role: "DevOps Engineer",
  },
  {
    id: "dev-25",
    name: "Tanya Kapoor",
    experience: 3.9,
    role: "Full Stack Developer",
  },
];

const technologies = [
  { id: "tech-01", name: "React", category: "Frontend" },
  { id: "tech-02", name: "Next.js", category: "Frontend" },
  { id: "tech-03", name: "Node.js", category: "Backend" },
  { id: "tech-04", name: "TypeScript", category: "Language" },
  { id: "tech-05", name: "JavaScript", category: "Language" },
  { id: "tech-06", name: "Python", category: "Language" },
  { id: "tech-07", name: "Java", category: "Language" },
  { id: "tech-08", name: "Express.js", category: "Backend" },
  { id: "tech-09", name: "NestJS", category: "Backend" },
  { id: "tech-10", name: "Fastify", category: "Backend" },
  { id: "tech-11", name: "PostgreSQL", category: "Database" },
  { id: "tech-12", name: "MySQL", category: "Database" },
  { id: "tech-13", name: "MongoDB", category: "Database" },
  { id: "tech-14", name: "Redis", category: "Database" },
  { id: "tech-15", name: "GraphQL", category: "API" },
  { id: "tech-16", name: "REST API", category: "API" },
  { id: "tech-17", name: "Docker", category: "DevOps" },
  { id: "tech-18", name: "Kubernetes", category: "DevOps" },
  { id: "tech-19", name: "AWS", category: "Cloud" },
  { id: "tech-20", name: "Azure", category: "Cloud" },
  { id: "tech-21", name: "Git", category: "Tools" },
  { id: "tech-22", name: "GitHub", category: "Tools" },
  { id: "tech-23", name: "GitLab", category: "Tools" },
  { id: "tech-24", name: "Tailwind CSS", category: "Frontend" },
  { id: "tech-25", name: "Material UI", category: "Frontend" },
  { id: "tech-26", name: "Redux", category: "Frontend" },
  { id: "tech-27", name: "Prisma", category: "ORM" },
  { id: "tech-28", name: "Jest", category: "Testing" },
  { id: "tech-29", name: "Cypress", category: "Testing" },
  { id: "tech-30", name: "Terraform", category: "DevOps" },
];

const companies = [
  { id: "company-01", name: "TechNova Solutions", location: "Noida" },
  { id: "company-02", name: "CloudWorks Technologies", location: "Bangalore" },
  { id: "company-03", name: "FinEdge Systems", location: "Gurgaon" },
  { id: "company-04", name: "CodeCraft Labs", location: "Pune" },
  { id: "company-05", name: "InnoSoft Technologies", location: "Hyderabad" },
  { id: "company-06", name: "DigitalSphere", location: "Delhi" },
  { id: "company-07", name: "DataBridge Solutions", location: "Mumbai" },
  { id: "company-08", name: "NextGen Software", location: "Chandigarh" },
  { id: "company-09", name: "AppVertex", location: "Jaipur" },
  { id: "company-10", name: "ByteStack Technologies", location: "Ahmedabad" },
  { id: "company-11", name: "WebCore Systems", location: "Noida" },
  { id: "company-12", name: "CloudMatrix", location: "Bangalore" },
  { id: "company-13", name: "SoftPeak Solutions", location: "Gurgaon" },
  { id: "company-14", name: "TechOrbit", location: "Hyderabad" },
  { id: "company-15", name: "InnovateX Labs", location: "Pune" },
  { id: "company-16", name: "CodeSphere", location: "Mumbai" },
  { id: "company-17", name: "FinTechWorks", location: "Delhi" },
  { id: "company-18", name: "HealthTech Innovations", location: "Bangalore" },
  { id: "company-19", name: "RetailStack", location: "Chennai" },
  { id: "company-20", name: "EnterpriseCloud", location: "Noida" },
];

const projects = [
  {
    id: "project-01",
    name: "PayFlow",
    description: "Digital payment and wallet platform",
  },
  {
    id: "project-02",
    name: "ShopSphere",
    description: "Modern e-commerce platform",
  },
  {
    id: "project-03",
    name: "HealthConnect",
    description: "Healthcare management platform",
  },
  {
    id: "project-04",
    name: "TravelMate",
    description: "Travel booking and recommendation platform",
  },
  {
    id: "project-05",
    name: "EduLearn",
    description: "Online learning management platform",
  },
  {
    id: "project-06",
    name: "FoodExpress",
    description: "Food delivery application",
  },
  {
    id: "project-07",
    name: "FleetTrack",
    description: "Fleet tracking and management system",
  },
  {
    id: "project-08",
    name: "FinLedger",
    description: "Financial reporting and analytics platform",
  },
  {
    id: "project-09",
    name: "SocialConnect",
    description: "Social networking platform",
  },
  {
    id: "project-10",
    name: "CloudMonitor",
    description: "Cloud infrastructure monitoring system",
  },
  {
    id: "project-11",
    name: "HRPortal",
    description: "Employee management platform",
  },
  {
    id: "project-12",
    name: "RealEstateHub",
    description: "Property discovery platform",
  },
  {
    id: "project-13",
    name: "MediaStream",
    description: "Video and media streaming platform",
  },
  {
    id: "project-14",
    name: "RetailAnalytics",
    description: "Retail analytics and reporting system",
  },
  {
    id: "project-15",
    name: "SecureBank",
    description: "Digital banking platform",
  },
];

const domains = [
  { id: "domain-01", name: "FinTech" },
  { id: "domain-02", name: "E-Commerce" },
  { id: "domain-03", name: "Healthcare" },
  { id: "domain-04", name: "Education" },
  { id: "domain-05", name: "Travel" },
  { id: "domain-06", name: "Logistics" },
  { id: "domain-07", name: "Media" },
  { id: "domain-08", name: "Enterprise SaaS" },
];

async function seed() {
  const session = driver.session();

  try {
    console.log("Connecting to CognoDB...");

    await driver.verifyConnectivity();

    console.log("Connected successfully.");

    // ---------------------------------------------------
    // 1. CLEAN DATABASE
    // ---------------------------------------------------

    console.log("Cleaning existing graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    // ---------------------------------------------------
    // 2. CREATE TECHNOLOGIES
    // ---------------------------------------------------

    console.log("Creating technologies...");

    await session.run(
      `
      UNWIND $technologies AS technology

      CREATE (:Technology {
        id: technology.id,
        name: technology.name,
        category: technology.category
      })
      `,
      { technologies }
    );

    // ---------------------------------------------------
    // 3. CREATE COMPANIES
    // ---------------------------------------------------

    console.log("Creating companies...");

    await session.run(
      `
      UNWIND $companies AS company

      CREATE (:Company {
        id: company.id,
        name: company.name,
        location: company.location
      })
      `,
      { companies }
    );

    // ---------------------------------------------------
    // 4. CREATE DOMAINS
    // ---------------------------------------------------

    console.log("Creating domains...");

    await session.run(
      `
      UNWIND $domains AS domain

      CREATE (:Domain {
        id: domain.id,
        name: domain.name
      })
      `,
      { domains }
    );

    // ---------------------------------------------------
    // 5. CREATE PROJECTS
    // ---------------------------------------------------

    console.log("Creating projects...");

    await session.run(
      `
      UNWIND $projects AS project

      CREATE (:Project {
        id: project.id,
        name: project.name,
        description: project.description
      })
      `,
      { projects }
    );

    // ---------------------------------------------------
    // 6. CREATE DEVELOPERS
    // ---------------------------------------------------

    console.log("Creating developers...");

    await session.run(
      `
      UNWIND $developers AS developer

      CREATE (:Developer {
        id: developer.id,
        name: developer.name,
        experience: developer.experience,
        role: developer.role
      })
      `,
      { developers }
    );

    // ---------------------------------------------------
    // 7. DEVELOPER -> COMPANY
    // ---------------------------------------------------

    console.log("Creating WORKED_AT relationships...");

    const companyRelationships = developers.map((developer, index) => ({
      developerId: developer.id,
      companyId: companies[index % companies.length].id,
    }));

    await session.run(
      `
      UNWIND $relationships AS relationship

      MATCH (d:Developer {id: relationship.developerId})
      MATCH (c:Company {id: relationship.companyId})

      CREATE (d)-[:WORKED_AT]->(c)
      `,
      {
        relationships: companyRelationships,
      }
    );

    // ---------------------------------------------------
    // 8. DEVELOPER -> TECHNOLOGY
    // ---------------------------------------------------

    console.log("Creating HAS_SKILL relationships...");

    const developerSkills = developers.flatMap((developer, index) => {
      const skillCount = 5 + (index % 4);

      const skills = [];

      for (let i = 0; i < skillCount; i++) {
        const technologyIndex =
          (index * 3 + i) % technologies.length;

        skills.push({
          developerId: developer.id,
          technologyId: technologies[technologyIndex].id,
        });
      }

      return skills;
    });

    await session.run(
      `
      UNWIND $relationships AS relationship

      MATCH (d:Developer {id: relationship.developerId})
      MATCH (t:Technology {id: relationship.technologyId})

      CREATE (d)-[:HAS_SKILL]->(t)
      `,
      {
        relationships: developerSkills,
      }
    );

    // ---------------------------------------------------
    // 9. DEVELOPER -> PROJECT
    // ---------------------------------------------------

    console.log("Creating WORKED_ON relationships...");

    const developerProjects = developers.flatMap(
      (developer, index) => {
        const project1 =
          projects[index % projects.length];

        const project2 =
          projects[(index + 5) % projects.length];

        return [
          {
            developerId: developer.id,
            projectId: project1.id,
          },
          {
            developerId: developer.id,
            projectId: project2.id,
          },
        ];
      }
    );

    await session.run(
      `
      UNWIND $relationships AS relationship

      MATCH (d:Developer {id: relationship.developerId})
      MATCH (p:Project {id: relationship.projectId})

      CREATE (d)-[:WORKED_ON]->(p)
      `,
      {
        relationships: developerProjects,
      }
    );

    // ---------------------------------------------------
    // 10. PROJECT -> TECHNOLOGY
    // ---------------------------------------------------

    console.log("Creating USES relationships...");

    const projectTechnologies = projects.flatMap(
      (project, index) => {
        const relationships = [];

        for (let i = 0; i < 5; i++) {
          const technologyIndex =
            (index * 2 + i) % technologies.length;

          relationships.push({
            projectId: project.id,
            technologyId: technologies[technologyIndex].id,
          });
        }

        return relationships;
      }
    );

    await session.run(
      `
      UNWIND $relationships AS relationship

      MATCH (p:Project {id: relationship.projectId})
      MATCH (t:Technology {id: relationship.technologyId})

      CREATE (p)-[:USES]->(t)
      `,
      {
        relationships: projectTechnologies,
      }
    );

    // ---------------------------------------------------
    // 11. PROJECT -> DOMAIN
    // ---------------------------------------------------

    console.log("Creating IN_DOMAIN relationships...");

    const projectDomains = projects.map((project, index) => ({
      projectId: project.id,
      domainId: domains[index % domains.length].id,
    }));

    await session.run(
      `
      UNWIND $relationships AS relationship

      MATCH (p:Project {id: relationship.projectId})
      MATCH (domain:Domain {id: relationship.domainId})

      CREATE (p)-[:IN_DOMAIN]->(domain)
      `,
      {
        relationships: projectDomains,
      }
    );

    // ---------------------------------------------------
    // 12. VERIFY COUNTS
    // ---------------------------------------------------

    const countResult = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS label, count(n) AS count
      ORDER BY label
    `);

    console.log("\nNode counts:");

    for (const record of countResult.records) {
      console.log(
        `${record.get("label")}: ${record.get("count").toNumber()}`
      );
    }

    const relationshipResult = await session.run(`
      MATCH ()-[r]->()
      RETURN type(r) AS relationship, count(r) AS count
      ORDER BY relationship
    `);

    console.log("\nRelationship counts:");

    for (const record of relationshipResult.records) {
      console.log(
        `${record.get("relationship")}: ${record
          .get("count")
          .toNumber()}`
      );
    }

    console.log("\n=================================");
    console.log("Seed completed successfully!");
    console.log("=================================");
  } catch (error) {
    console.error("\nSeed failed:", error);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

seed();