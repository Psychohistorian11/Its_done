"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Category from "@/interfaces/category";

interface AlertDeleteCategoryProps {
  category: Category;
  setLoading: (value: boolean) => void;
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

export function AlertDeleteCategory({
  category,
  setLoading,
  setCategories
}: AlertDeleteCategoryProps) {
  const handleDeleteCategory = async () => {
    setLoading(true);
    try {
      const id = category.id;
      const response = await fetch("/api/category", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete category");
      }
  
      // Actualizar el estado local eliminando la categoría del array
      setCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== id)
      );
    } catch (error) {
      console.error("Error deleting category:", error);
    }
    setLoading(false);
  };
  

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="text-black rounded-none border-none hover:bg-transparent"
            variant="outline"
          >
            Delete category
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              category and all tasks related to it, removing data from our
              servers..
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCategory}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
