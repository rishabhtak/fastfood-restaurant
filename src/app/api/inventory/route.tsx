import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { inventoryType } from "@/types/inventoryType";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const {
      name,
      description,
      image,
      category,
      vegNonVeg,
      inStock,
      variants,
      addons,
    }: inventoryType = await req.json();

    const inventoryData = await prisma.inventory.create({
      data: {
        name,
        description,
        image,
        category,
        vegNonVeg,
        inStock,
        variants: variants.map((variant) => ({ ...variant })),
        addons: addons.map((addon) => ({ ...addon })),
      },
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
    const id = Number(searchParams.get("id")) || null;
    const offset = Number(searchParams.get("offset")) || 0;
    const limit = Number(searchParams.get("limit")) || null;
    const itemName = searchParams.get("search") || "";

    // Fetch single inventory item by id
    if (id) {
      const inventory = await prisma.inventory.findUnique({ where: { id } });

      if (!inventory) {
        return NextResponse.json({
          inventory: null,
          message: "Inventory not found",
          status: 404,
        });
      }

      return NextResponse.json({ inventory, message: "Success", status: 200 });
    }

    // Fetch multiple inventory items with pagination and search
    if (limit) {
      const [inventories, count] = await Promise.all([
        prisma.inventory.findMany({
          skip: offset,
          take: limit,
          where: { name: { contains: itemName } },
        }),
        prisma.inventory.count({ where: { name: { contains: itemName } } }),
      ]);

      return NextResponse.json({
        inventories,
        count,
        message: "Success",
        status: 200,
      });
    }

    // Fetch all items' inStock data if no id, offset, or limit is provided
    const inStockData = await prisma.inventory.findMany({
      select: { id: true, inStock: true, name: true, category: true },
      orderBy: { name: "asc" },
    });

    return NextResponse.json({ inStockData, message: "Success", status: 200 });
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
    const id = body.id;
    // Ensure ID is valid
    if (!id || isNaN(id)) {
      return NextResponse.json({
        message: "Invalid ID",
        status: 400,
      });
    }
    if (body.inventoryData) {
      const {
        name,
        description,
        image,
        category,
        inStock,
        variants,
        addons,
        vegNonVeg,
      }: inventoryType = body.inventoryData;

      // Update the inventory item
      await prisma.inventory.update({
        where: { id },
        data: {
          name,
          description,
          image,
          category,
          inStock,
          variants: variants.map((variant) => ({ ...variant })),
          addons: addons.map((addon) => ({ ...addon })),
          vegNonVeg,
        },
      });

      return NextResponse.json({
        message: "Inventory updated successfully",
        status: 200,
      });
    } else if (typeof body.inStock === "boolean") {
      // Update the inStock status
      await prisma.inventory.update({
        where: { id },
        data: {
          inStock: body.inStock,
        },
      });

      return NextResponse.json({
        message: "Inventory InStock updated successfully",
        status: 200,
      });
    } else {
      return NextResponse.json({
        inventory: null,
        message: "Invalid parameter",
        status: 400,
      });
    }
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
