import Breadcrumbs from "@/components/Breadcrumbs";
import PageContainer from "@/components/Admin/PageContainer";
import { userColumns } from "@/components/Admin/User/userColumns";
import { buttonVariants } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { userType } from "@/types/userType";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/Admin/DataTable";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "User", link: "/admin/dashboard/user" },
];

type paramsProps = {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

export default async function page({ searchParams }: paramsProps) {
  const page = Number(searchParams.page) || 1;
  const pageLimit = Number(searchParams.limit) || 10;
  const country = searchParams.search || null;
  const offset = (page - 1) * pageLimit;

  const res = await fetch(
    `https://api.slingacademy.com/v1/sample-data/users?offset=${offset}&limit=${pageLimit}` +
      (country ? `&search=${country}` : "")
  );
  const userRes = await res.json();
  const totalUsers = userRes.total_users; //1000
  const pageCount = Math.ceil(totalUsers / pageLimit);
  const user: userType[] = userRes.users;
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="flex items-start justify-between">
          <Heading title={`User (${totalUsers})`} />

          <Link
            href={"/dashboard/employee/new"}
            className={cn(buttonVariants({ variant: "default" }))}
          >
            <Plus className="mr-2 h-4 w-4" /> Add New
          </Link>
        </div>
        <Separator />

        <DataTable
          searchKey="country"
          pageNo={page}
          columns={userColumns}
          totalUsers={totalUsers}
          data={user}
          pageCount={pageCount}
          statusBox={true}
        />
      </div>
    </PageContainer>
  );
}
