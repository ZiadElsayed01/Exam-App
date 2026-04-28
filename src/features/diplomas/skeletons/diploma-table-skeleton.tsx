"use client";

export default function DiplomaTableSkeleton() {
  return (
    <div className="bg-white border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 h-12">
            <tr>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-25"
              >
                <div className="h-4 bg-gray-300 animate-pulse"></div>
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white w-50"
              >
                <div className="h-4 bg-gray-300 animate-pulse"></div>
              </th>
              <th
                scope="col"
                className="px-2.5 text-left text-sm font-medium text-white"
              >
                <div className="h-4 bg-gray-300 animate-pulse"></div>
              </th>
              <th
                scope="col"
                className="px-2.5 text-sm font-medium text-white w-20"
              >
                <div className="h-4 bg-gray-300 animate-pulse"></div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-100">
            {Array.from({ length: 8 }).map((_, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="px-4 py-2.5 whitespace-nowrap">
                  <div className="h-25 w-22.5 p-2.5 relative">
                    <div className="h-full w-full bg-gray-200 animate-pulse"></div>
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="h-4 bg-gray-200 animate-pulse w-3/4"></div>
                </td>
                <td className="px-4 py-2.5">
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 animate-pulse"></div>
                    <div className="h-3 bg-gray-200 animate-pulse w-5/6"></div>
                    <div className="h-3 bg-gray-200 animate-pulse w-4/6"></div>
                  </div>
                </td>
                <td className="px-4 py-2.5 whitespace-nowrap text-right text-sm font-medium">
                  <div className="h-7.5 w-7.5 bg-gray-200 animate-pulse ml-auto"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
