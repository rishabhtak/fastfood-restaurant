import PageContainer from "@/components/Admin/PageContainer";
import { Heading } from "@/components/ui/heading";
import { inventoryType } from "@/types/inventoryType";
import { Inventory } from "@/components/Admin/Inventory/Inventory";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Inventory", link: "/admin/dashboard/inventory" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};
const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const name = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  try {
    const response = await fetch(
      `${baseUrl}/api/inventory/?offset=${offset}&limit=${pageLimit}&_=${Date.now()}` +
        (name ? `&search=${name}` : ""),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (data.status === "400" || data.status === "500") {
      throw new Error("Failed to fetch inventory data");
    }
    const pageCount = Math.ceil(data?.inventories?.length / pageLimit);
    const inventory: inventoryType[] = data.inventories;

    return (
      <Inventory
        inventory={inventory}
        pageCount={pageCount}
        page={page}
        breadcrumbItems={breadcrumbItems}
      />
    );
  } catch (error) {
    return (
      <PageContainer>
        <div className="space-y-4">
          <Heading title="Failed to load inventory data because of internal server error or bad request." />
          <p>{`Please try again later or Keep trying to reload browser ${error}`}</p>
        </div>
      </PageContainer>
    );
  }
}
