import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  console.log("testing route");
  try {
    return NextResponse.json({
      message: "Success",
      status: 200,
    });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
