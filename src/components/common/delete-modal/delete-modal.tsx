"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

type DeleteModalProps = {
  open: boolean;
  title?: string;
  message?: string;
  onCancel: () => void;
  onConfirm: () => void | Promise<void>;
  confirmText?: string;
  cancelText?: string;
  loading?: boolean;
};

export default function DeleteModal({
  open,
  title = "Delete Item",
  message = "Are you sure you want to delete this item? This action cannot be undone.",
  onCancel,
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  loading = false,
}: DeleteModalProps) {
  return (
    <Dialog open={open} onClose={onCancel}>
      <DialogTitle>⚠ {title}</DialogTitle>

      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} variant="outlined">
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          variant="contained"
          color="error"
          disabled={loading}
        >
          {loading ? "Deleting..." : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}