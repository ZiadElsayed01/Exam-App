"use client";
import { Ellipsis, Eye, PenLine, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import Link from "next/link";
import { SimpleDropdown, SimpleDropdownItem } from "./ui/simple-dropdown";

interface IActionsDropdownProps {
  viewLink: string;
  editLink: string;
  onDelete: () => void;
}

export function ActionsDropdown({
  viewLink,
  editLink,
  onDelete,
}: IActionsDropdownProps) {
  return (
    <SimpleDropdown
      trigger={
        <Button
          size="icon"
          className="h-7.5 w-7.5 bg-gray-200 hover:bg-gray-300"
        >
          <Ellipsis className="h-4 w-4 text-gray-800" />
        </Button>
      }
      align="end"
      contentClassName="w-34 border border-gray-200"
    >
      <SimpleDropdownItem className="cursor-pointer p-3.5">
        <Link href={viewLink} className="flex items-center gap-2.5">
          <Eye className="h-4 w-4 text-emerald-500" />
          View
        </Link>
      </SimpleDropdownItem>

      <SimpleDropdownItem className="cursor-pointer p-3.5">
        <Link href={editLink} className="flex items-center gap-2.5">
          <PenLine className="h-4 w-4 text-blue-500" />
          Edit
        </Link>
      </SimpleDropdownItem>

      <SimpleDropdownItem
        onClick={onDelete}
        className="cursor-pointer flex items-center gap-2.5 p-3.5"
      >
        <Trash2 className="h-4 w-4 text-red-500" />
        Delete
      </SimpleDropdownItem>
    </SimpleDropdown>
  );
}
