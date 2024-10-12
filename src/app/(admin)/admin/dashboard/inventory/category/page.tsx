import Breadcrumbs from "@/components/Breadcrumbs";
import PageContainer from "@/components/Admin/PageContainer";

import Category from "@/components/Admin/Inventory/Category";

const breadcrumbItems = [
  { title: "Dashboard", link: "/admin/dashboard" },
  { title: "Inventory", link: "/admin/dashboard/inventory" },
  { title: "Category", link: "/admin/dashboard/inventory/category" },
];

const page = () => {
  return (
    <PageContainer>
      <div className="space-y-4">
        <Breadcrumbs items={breadcrumbItems} />

        <Category />
      </div>
    </PageContainer>
  );
};

export default page;
