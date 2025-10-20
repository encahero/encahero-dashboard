import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
function PreviewImage({ img, onClose }) {
  return (
    <Dialog open={!!img} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl p-4 bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-center">Image Preview</DialogTitle>
        </DialogHeader>
        {img && (
          <img
            src={img}
            alt="Preview"
            className="w-full h-auto object-contain rounded-md"
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default PreviewImage;
