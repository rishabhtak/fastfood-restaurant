import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { inventoryType } from "@/types/inventoryType";

export async function POST(req: NextRequest): Promise<NextResponse> {
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

export async function GET(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);

    const idParam = searchParams.get("id");
    const offset = Number(searchParams.get("offset"));
    const limit = Number(searchParams.get("limit"));
    const id = idParam ? Number(idParam) : null;
    const itemName = searchParams.get("search");

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

      return NextResponse.json({ inventory, message: "Success", status: 200 });
    } else if (!idParam) {
      const [inventories, count] = await Promise.all([
        prisma.inventory.findMany({
          skip: offset,
          take: limit,
          where: {
            name: {
              contains: itemName ?? "",
            },
          },
        }),
        prisma.inventory.count({
          where: {
            name: {
              contains: itemName ?? "",
            },
          },
        }),
      ]);

      return NextResponse.json({
        inventories,
        count,
        message: "Success",
        status: 200,
      });
    }

    return NextResponse.json({
      inventory: null,
      message: "Invalid parameter",
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

export async function PUT(req: NextRequest): Promise<NextResponse> {
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

export async function DELETE(req: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(req.url);
    const idParam = searchParams.get("id");
    const id = idParam ? Number(idParam) : null;

    if (!id || isNaN(id)) {
      return NextResponse.json({
        message: "Invalid ID",
        status: 400,
      });
    } else {
      const deletedInventory = await prisma.inventory.delete({
        where: { id },
      });

      return NextResponse.json({
        deletedInventory,
        message: "Inventory deleted successfully",
        status: 200,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Error deleting inventory",
      status: 500,
    });
  }
}
