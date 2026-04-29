"use client";

interface TableSkeletonProps {
  columns: number;
  rows?: number;
  showImageColumn?: boolean;
  showMultiLineColumn?: boolean;
  showActionColumn?: boolean;
}

export default function TableSkeleton({
  columns,
  rows = 8,
  showImageColumn = true,
  showMultiLineColumn = false,
  showActionColumn = true,
}: TableSkeletonProps) {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 h-12">
            <tr>
              {Array.from({ length: columns }).map((_, index) => (
                <th
                  key={index}
                  scope="col"
                  className={`px-2.5 text-left text-sm font-medium text-white ${
                    index === 0
                      ? "w-25"
                      : index === 1
                        ? "w-50"
                        : index === 2 && columns > 4
                          ? "w-40"
                          : index === columns - 2
                            ? "w-30"
                            : index === columns - 1
                              ? "w-20"
                              : ""
                  }`}
                >
                  <div className="h-4 bg-gray-300 animate-pulse"></div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: rows }).map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-gray-100">
                {showImageColumn && (
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <div className="h-25 w-22.5 p-2.5 relative">
                      <div className="h-full w-full bg-gray-200 animate-pulse"></div>
                    </div>
                  </td>
                )}

                <td className="px-4 py-2.5">
                  <div className="h-4 bg-gray-200 animate-pulse w-3/4"></div>
                </td>

                {showMultiLineColumn ? (
                  <td className="px-4 py-2.5">
                    <div className="space-y-2">
                      <div className="h-3 bg-gray-200 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 animate-pulse w-5/6"></div>
                      <div className="h-3 bg-gray-200 animate-pulse w-4/6"></div>
                    </div>
                  </td>
                ) : (
                  <td className="px-4 py-2.5">
                    <div className="h-4 bg-gray-200 animate-pulse w-2/3"></div>
                  </td>
                )}

                {columns > 4 && (
                  <td className="px-4 py-2.5">
                    <div className="h-4 bg-gray-200 animate-pulse w-1/2"></div>
                  </td>
                )}

                {showActionColumn && (
                  <td className="px-4 py-2.5 whitespace-nowrap text-center text-sm font-medium">
                    <div className="h-7.5 w-7.5 bg-gray-200 animate-pulse mx-auto"></div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
