import { NextResponse } from "next/server";
import { driver } from "../../lib/db";

export async function GET() {
  const session = driver.session();

  try {
    const result = await session.run(`
      MATCH (d:Developer)
      RETURN d
      ORDER BY d.name
    `);

    const developers = result.records.map((record) => {
      const developer = record.get("d").properties;

      return {
        id: developer.id,
        name: developer.name,
        experience: developer.experience,
        role: developer.role,
      };
    });

    return NextResponse.json({
      success: true,
      data: developers,
    });
  } catch (error) {
    console.error("Developers API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch developers",
      },
      { status: 500 }
    );
  } finally {
    await session.close();
  }
}