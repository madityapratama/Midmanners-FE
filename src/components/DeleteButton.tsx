import React, { useState } from "react";
import { useRouter } from "next/router";
import api from "@/lib/axios";
import { Trash2 } from "lucide-react";
import {
  Root as AlertDialogRoot,
  Trigger as AlertDialogTrigger,
  Portal as AlertDialogPortal,
  Overlay as AlertDialogOverlay,
  Content as AlertDialogContent,
  Title as AlertDialogTitle,
  Description as AlertDialogDescription,
  Cancel as AlertDialogCancel,
  Action as AlertDialogAction,
} from "@radix-ui/react-alert-dialog";

import toast, { Toaster } from "react-hot-toast";

interface DeleteButtonProps {
  postId: string | number;
  onDeleteSuccess: (postId: string | number) => void;
  children: React.ReactNode;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  postId,
  onDeleteSuccess,
  children,
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const response = await api.delete(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`);
      toast.success(response.data.message);
      onDeleteSuccess(postId);
      setTimeout(() => {
          router.push("/dashboard");
        }, 1500);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Toaster position="top-center" />

      <AlertDialogRoot>
        <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

        <AlertDialogPortal>
          <AlertDialogOverlay className="fixed inset-0 bg-black/50" />
          <AlertDialogContent className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg focus:outline-none">
            <AlertDialogTitle className="text-lg font-semibold text-gray-900">
              Konfirmasi Hapus Produk
            </AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-sm text-gray-600">
              Apakah Anda yakin ingin menghapus produk ?
            </AlertDialogDescription>

            <div className="mt-6 flex justify-end space-x-3">
              <AlertDialogCancel asChild>
                <button
                  className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-black"
                  disabled={isDeleting}
                >
                  Batal
                </button>
              </AlertDialogCancel>

              <AlertDialogAction asChild>
                <button
                  className="px-4 py-2 rounded-md bg-red-600 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    "Menghapus..."
                  ) : (
                    <>
                      <Trash2 className="inline mr-2 h-4 w-4" />
                      Ya, Hapus
                    </>
                  )}
                </button>
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialogPortal>
      </AlertDialogRoot>
    </>
  );
};

export default DeleteButton;
