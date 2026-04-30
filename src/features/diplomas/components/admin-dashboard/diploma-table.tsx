import { SortDropdown } from "@/shared/components/global/sort-dropdown";
import Image from "next/image";
import { memo } from "react";
import { diplomaSortOptions } from "../../constants/diploma.constants";
import TableSkeleton from "@/shared/skeletons/table-skeleton";
import { IDiploma } from "../../types/diploma";
import DiplomaActionsDropdown from "./diploma-actions-dropdown";
import { slugify } from "@/shared/lib/utils/utils";

interface DiplomaTableProps {
  diplomas: IDiploma[];
  isLoading?: boolean;
}

function DiplomaTable({ diplomas, isLoading }: DiplomaTableProps) {
  if (isLoading) {
    return (
      <TableSkeleton
        columns={4}
        showImageColumn={true}
        showMultiLineColumn={true}
        showActionColumn={true}
      />
    );
  }

  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-primary h-9">
            <tr>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-25"
              >
                Image
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-50"
              >
                Title
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white"
              >
                Description
              </th>
              <th
                scope="col"
                className="px-2.5 text-sm font-medium text-white w-20"
              >
                {""}
                <SortDropdown sortOptions={diplomaSortOptions} />
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {diplomas.map((diploma) => (
              <tr key={diploma.id} className="hover:bg-gray-100">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="h-25 w-22.5 p-2.5 relative flex items-center justify-center">
                    {diploma.image ? (
                      <Image
                        className="h-10 w-10 object-cover"
                        src={diploma.image}
                        alt={diploma.title}
                        fill
                      />
                    ) : (
                      <span className="text-xs text-gray-500">No Image</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-2.5 relative group">
                  <div className="text-sm font-medium text-gray-800 truncate">
                    {diploma.title}
                  </div>
                  <p className="absolute bg-gray-800 p-2.5 hidden group-hover:block text-white bottom-20 left-0 z-10">
                    {diploma.title}{" "}
                    <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-gray-800"></span>
                  </p>
                </td>
                <td className="px-4 py-2.5">
                  <div className="text-sm text-gray-500 line-clamp-4">
                    {diploma.description}
                  </div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-center text-sm font-medium">
                  <DiplomaActionsDropdown
                    viewLink={`/diplomas/${slugify(diploma.title)}/${diploma.id}`}
                    editLink={`/diplomas/edit-diploma/${diploma.id}`}
                    id={diploma.id}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {diplomas.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-800">No diplomas found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(DiplomaTable);
