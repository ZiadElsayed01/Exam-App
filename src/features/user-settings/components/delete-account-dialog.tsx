"use client";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Loader2, TriangleAlert } from "lucide-react";
import { deleteProfileAction } from "../apis/profile.api";
import { useState } from "react";
import { signOut } from "next-auth/react";
import React from "react";
import FallbackError from "@/shared/components/global/fallback-error";

interface DeleteAccountDialogProps {
  trigger?: React.ReactNode;
}

export default function DeleteAccountDialog({
  trigger,
}: DeleteAccountDialogProps) {
  // States
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Handle delete account
  const handleDeleteAccount = async () => {
    setLoading(true);
    const result = await deleteProfileAction();
    if (!result.status) {
      setError(result.message);
      setLoading(false);
      return;
    }
    signOut();
    setLoading(false);
  };

  return (
    <>
      {/* Delete Profile Dialog */}
      <Dialog>
        {trigger && React.isValidElement(trigger) ? (
          <DialogTrigger render={trigger} />
        ) : (
          <DialogTrigger
            render={
              <Button variant="destructive" className="w-full">
                Delete My Account
              </Button>
            }
          />
        )}
        <DialogContent className="border-b border-gray-200 gap-0">
          {/* Dialog header */}
          <DialogHeader className="text-center p-9 flex flex-col items-center justify-center gap-0">
            {/* Warning icon */}
            <div className="w-27.5 h-27.5 bg-red-50 rounded-full flex items-center justify-center mb-7.5">
              <div className="flex items-center justify-center w-20 h-20 bg-red-100 rounded-full">
                <TriangleAlert
                  className="text-red-600 w-12.5 h-12.5 font-normal"
                  strokeWidth={1.25}
                />
              </div>
            </div>

            {/* Dialog title */}
            <DialogTitle className="text-red-600 text-lg mb-2.5">
              Are you sure you want to delete your account?
            </DialogTitle>

            {/* Dialog description */}
            <DialogDescription className="text-gray-500">
              This action is permanent and cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {/* Fallback error message */}
          <div className="px-9">{error && <FallbackError error={error} />}</div>
          <DialogFooter className="bg-gray-50 mt-4 border-t border-gray-200 p-6 flex items-center justify-center gap-2.5">
            {/* Cancel button */}
            <DialogClose
              render={
                <Button variant="outline" className="w-53.5 bg-gray-200">
                  Cancel
                </Button>
              }
            />

            {/* Delete button */}
            <Button
              disabled={loading}
              className="w-53.5 bg-red-600 text-white"
              onClick={handleDeleteAccount}
            >
              {loading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                "Yes, delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
