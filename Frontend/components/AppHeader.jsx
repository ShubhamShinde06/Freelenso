import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { usePathname } from "next/navigation";

export default function SiteHeader() {

  const pathname = usePathname();

  const segments = pathname.split("/").filter(Boolean);

  // Detect the action: 'create' or 'edit'
  const action = segments.includes("edit")
    ? "Edit"
    : segments.includes("create")
    ? "Create New"
    : "";

  // Detect the resource
  let resource = segments[0] || "Home";

  // Custom transformation logic (no map)
  if (resource === "account-group") {
    resource = "Account group";
  } else if (resource === "item-group") {
    resource = "Item group";
  } else if (resource === "gst-class") {
    resource = "GST Class";
  } else {
    // Default formatting: capitalize and replace hyphens with spaces
    resource =
      resource.charAt(0).toUpperCase() + resource.slice(1).replace(/-/g, " ");
  }

  // Final title
  const title = `${action} ${resource}`.trim();

  return (
    <header className="flex h-(--header-height) print:hidden shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">{title}</h1>
      
      </div>
    </header>
  )
}
