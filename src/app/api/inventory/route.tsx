import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { inventoryType } from "@/types/inventoryType";

export async function POST(req: Request): Promise<NextResponse> {
  console.log("add");

  try {
    const { name, description, price, image, category }: inventoryType =
      await req.json();

    const inventoryData = await prisma.inventory.create({
      data: { name, description, price, image, category },
    });

    return NextResponse.json({
      inventoryData,
      message: "Success",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error, message: "Error", status: 500 });
  }
}

export async function GET(req: Request): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = idParam ? Number(idParam) : null;

    if (id && !isNaN(id) && id > 0) {
      const inventory = await prisma.inventory.findUnique({
        where: { id },
      });

      if (!inventory) {
        return NextResponse.json({
          inventory: null,
          message: "Inventory not found",
          status: 404,
        });
      }
      //  console.log("inventories route", inventory);

      return NextResponse.json({ inventory, message: "Success", status: 200 });
    } else if (!idParam) {
      const inventories = await prisma.inventory.findMany();
      return NextResponse.json({
        inventories,
        message: "Success",
        status: 200,
      });
    }

    return NextResponse.json({
      inventory: null,
      message: "Invalid id parameter",
      status: 400,
    });
  } catch (error) {
    return NextResponse.json({
      inventory: null,
      message: "Error",
      status: 500,
    });
  }
}

export async function PUT(req: Request): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { name, description, price, image, category }: inventoryType =
      body.inventoryData;
    const id = body.id;

    // Ensure ID is valid
    if (!id || isNaN(id)) {
      return NextResponse.json({
        message: "Invalid ID",
        status: 400,
      });
    }

    // Update the inventory item
    const updatedInventory = await prisma.inventory.update({
      where: { id },
      data: { name, description, price, image, category },
    });

    return NextResponse.json({
      updatedInventory,
      message: "Inventory updated successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Error updating inventory",
      status: 500,
    });
  }
}
