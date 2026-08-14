import { NextResponse } from "next/server";
import { driver } from "../../lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const technology = searchParams.get("technology");

  if (!technology) {
    return NextResponse.json(
      {
        success: false,
        message: "Technology is required",
      },
      { status: 400 }
    );
  }

  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (d:Developer)
            -[:WORKED_ON]->(p:Project)
            -[:USES]->(t:Technology)

      WHERE toLower(t.name) = toLower($technology)

      RETURN
        d,
        p,
        t
      ORDER BY d.name
      `,
      {
        technology,
      }
    );

    const data = result.records.map((record) => ({
      developer: record.get("d").properties,
      project: record.get("p").properties,
      technology: record.get("t").properties,
    }));

    return NextResponse.json({
      success: true,
      count: data.length,
      data,
    });
  } catch (error) {
    console.error("Technology graph query error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch technology relationships",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}