import {
  Root,
  Trigger,
  Portal,
  Overlay,
  Content,
  Title,
  Description,
  Cancel,
  Action,
} from "@radix-ui/react-alert-dialog";
import { RotateCw, X, Check } from "lucide-react";
import Link from "next/link";

interface ConfirmDialogProps {
  onConfirm: () => void;
  loading?: boolean;
  title?: string;
  description?: string;
  children: React.ReactNode;
  confirmText?: string;
  cancelText?: string;
}

export default function ConfirmDialog({
  onConfirm,
  loading = false,
  title = "Konfirmasi",
  description = "Apakah Anda yakin ingin melanjutkan?",
  children,
  confirmText = "Ya, Lanjutkan",
  cancelText = "Batal",
}: ConfirmDialogProps) {
  return (
    <Root>
      <Trigger asChild>{children}</Trigger>

      <Portal>
        <Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50" />
        <Content className="fixed left-1/2 top-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-xl z-50 focus:outline-none">
          <Title className="text-lg font-semibold text-gray-900">
            {title}
          </Title>
          <Description className="mt-2 text-sm text-gray-600">
            {description}
          </Description>

          <div className="mt-6 flex justify-end space-x-3">
            <Cancel asChild>
              <button
                className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium hover:bg-gray-50 text-gray-700 transition-colors disabled:opacity-50"
                disabled={loading}
              >
                {cancelText}
              </button>
            </Cancel>
            <Action asChild>
              <button
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition-colors disabled:opacity-50"
                onClick={onConfirm}
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <RotateCw size={14} className="animate-spin" />
                    Memproses...
                  </span>
                ) : (
                  confirmText
                )}
              </button>
            </Action>
          </div>
        </Content>
      </Portal>
    </Root>
  );
}