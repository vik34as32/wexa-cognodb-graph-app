import { NextResponse } from "next/server";
import { driver } from "../../lib/db";

export async function GET() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (t:Technology)
      RETURN t
      ORDER BY t.name
    `);

    const technologies = result.records.map((record) => {
      return record.get("t").properties;
    });

    return NextResponse.json({
      success: true,
      data: technologies,
    });
  } catch (error) {
    console.error("Technologies API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch technologies",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}