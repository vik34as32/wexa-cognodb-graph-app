import { NextResponse } from "next/server";
import { driver } from "../../../lib/db";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  request: Request,
  { params }: Props
) {
  const { id } = await params;
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (d:Developer {id: $developerId})

      OPTIONAL MATCH (d)-[:HAS_SKILL]->(t:Technology)

      OPTIONAL MATCH (d)-[:WORKED_ON]->(p:Project)

      OPTIONAL MATCH (d)-[:WORKED_AT]->(c:Company)

      RETURN d,
             collect(DISTINCT t) AS technologies,
             collect(DISTINCT p) AS projects,
             collect(DISTINCT c) AS companies
      `,
      {
        developerId: id,
      }
    );

    if (result.records.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Developer not found",
        },
        { status: 404 }
      );
    }

    const record = result.records[0];

    const developer = record.get("d").properties;

    const technologies = record
      .get("technologies")
      .filter(Boolean)
      .map((node: any) => node.properties);

    const projects = record
      .get("projects")
      .filter(Boolean)
      .map((node: any) => node.properties);

    const companies = record
      .get("companies")
      .filter(Boolean)
      .map((node: any) => node.properties);

    return NextResponse.json({
      success: true,
      data: {
        developer,
        technologies,
        projects,
        companies,
      },
    });
  } catch (error) {
    console.error("Developer details error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch developer details",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}