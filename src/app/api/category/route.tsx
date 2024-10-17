import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { categoryType } from "@/types/categoryType";

export async function POST(req: NextRequest) {
  try {
    const { name }: categoryType = await req.json();

    // Check if the category already exists
    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      console.log("Category already exists", existingCategory);
      return NextResponse.json({
        message: "Category already exists",
        status: 409,
      });
    }
    await prisma.category.create({
      data: { name },
    });

    return NextResponse.json({
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      error: error,
      message: "Internal server error",
      status: 500,
    });
  }
}

export async function GET() {
  try {
    const categories = await prisma.category.findMany();
    return NextResponse.json({
      categories,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, message: "Error", status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = idParam ? Number(idParam) : null;

    if (!id || isNaN(id)) {
      return NextResponse.json({
        message: "Invalid ID",
        status: 400,
      });
    }

    const deletedCategory = await prisma.category.delete({
      where: { id },
    });

    return NextResponse.json({
      deletedCategory,
      message: "Category deleted successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, message: "Error", status: 500 });
  }
}
