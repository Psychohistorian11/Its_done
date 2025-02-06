'use client'

import { useState } from "react"
import { Button } from "../ui/button"
import { Dialog, 
         DialogContent, 
         DialogDescription, 
         DialogFooter, 
         DialogHeader, 
         DialogTitle, 
         DialogTrigger } from "../ui/dialog"

import { Input } from "../ui/input"
import { Label } from "../ui/label"
import ColorPicker from "./color-picker/color-picker"
import EmojiPicker from 'emoji-picker-react'
import './color-picker/color-picker.css'
import Loading from "../common/loading"
import Category from "@/interfaces/category"

const isColorLight = (hexColor: string) => {
  const r = parseInt(hexColor.substr(1, 2), 16)
  const g = parseInt(hexColor.substr(3, 2), 16)
  const b = parseInt(hexColor.substr(5, 2), 16)
  const luminosity = 0.2126 * r + 0.7152 * g + 0.0722 * b
  return luminosity > 128
}

interface EditCategoryProps {
  category: Category;
  setLoading: (value: boolean) => void;
}

export function EditCategory({ category, setLoading }: EditCategoryProps) {
  const [name, setName] = useState(category.name);
  const [color, setColor] = useState(category.color!);
  const [icon, setIcon] = useState(category.icon);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const textColor = isColorLight(color) ? "text-black" : "text-white";

  const handleEditCategory = async () => {
    setIsDialogOpen(false);
    setLoading(true);

    const id = category.id;

    try {
      const response = await fetch("api/category", {
        method: "PUT",
        body: JSON.stringify({ name, color, icon, id }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        console.log("Category created successfully");
      }
    } catch (error) {
      console.error("Error creating new category:", error);
    }
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  const handleColorChange = (newColor: string) => {
    setColor(newColor);
  };

  const handleEmojiSelect = (emojiData: any) => {
    setIcon(emojiData.emoji);
    setShowEmojiPicker(false);
  };

  return (
    <div>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-black rounded-none border-none hover:bg-transparent"
          >
            Edit category
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[450px]">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Edit your category here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 px-8">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                required
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="color" className="text-right">
                Color
              </Label>
              <ColorPicker
                id="color"
                value={color}
                onChange={handleColorChange}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="icon" className="text-right">
                Icon
              </Label>
              <div className="col-span-3 flex items-center space-x-2">
                <Input
                  id="icon"
                  value={icon}
                  readOnly
                  placeholder="Select an emoji"
                  className="w-20 text-center"
                />
                <Button
                  variant="outline"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  Pick Emoji
                </Button>
              </div>
            </div>
            {showEmojiPicker && (
              <div className="mt-2">
                <EmojiPicker onEmojiClick={handleEmojiSelect} />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              className={`${textColor}`}
              style={{ backgroundColor: color }}
              type="submit"
              onClick={handleEditCategory}
            >
              {icon} Save category
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
