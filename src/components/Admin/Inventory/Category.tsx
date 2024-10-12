"use client";
import { useState, useEffect, useContext } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { categoryType } from "@/types/categoryType";
import { useToast } from "@/components/ui/use-toast";
import { Trash } from "lucide-react";
import { Context } from "@/components/ContextProvider";

const categorySchema = z
  .string()
  .min(3, { message: "Category must be at least 3 characters" })
  .max(20, { message: "Category must be at most 20 characters" });

interface isLoadingProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const Category = () => {
  const [category, setCategory] = useState<string>("");
  const [categories, setCategories] = useState<categoryType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { isLoading, setIsLoading } = useContext(Context) as isLoadingProps;

  const fetchCategories = async (): Promise<void> => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      if (data.status === 500) {
        throw new Error(data.message);
      }
      setCategories(data.categories);
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 4000,
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    }
  };
  useEffect(() => {
    fetchCategories();
  }, []);

  const addCategory = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const validation = categorySchema.safeParse(category);
      if (!validation.success) {
        setError(validation.error.errors[0]?.message || "Invalid category");
        return;
      }
      // Check for duplicate category
      if (categories.some((cat) => cat.name === category)) {
        setError("Category already exists");
        return;
      }
      const response = await fetch("/api/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: category }),
      });
      const data = await response.json();
      if (data.status === 409 || data.status === 500) {
        throw new Error(data.message);
      }
      toast({
        title: "Category added successfully",
        duration: 2000,
      });
      setError(null);
      setCategory("");
      fetchCategories();
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 4000,
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCategory = async (id: number): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/category/?id=${id}`, {
        method: "DELETE",
      });
      const data = await response.json();
      if (data.status === 500) {
        throw new Error(data.message);
      }
      toast({
        title: "Category deleted successfully",
        duration: 2000,
      });
      fetchCategories();
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 4000,
        title: "Uh oh! Something went wrong.",
        description: `${error}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value;
    if (value.length <= 20) {
      setCategory(value);
    }
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-8">
        <div className="relative flex w-full mb-8 md:mb-0">
          <Input
            type="text"
            value={category}
            onChange={handleInputChange}
            placeholder="Enter category"
            className="flex-grow"
          />
          <span className="absolute right-0 -bottom-6 text-sm text-gray-500">
            {category.length}/20
          </span>
        </div>

        <Button onClick={addCategory}>Add Category</Button>
      </div>
      {error && <p className="text-red-500">{error}</p>}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loader"></span>
        </div>
      ) : (
        <ul className="space-y-2 mt-4">
          {categories.map((cat) => (
            <li
              key={cat.id}
              className="flex items-center justify-between p-2 border rounded capitalize"
            >
              <span>{cat.name}</span>
              <Button
                variant="destructive"
                onClick={() => deleteCategory(cat.id)}
              >
                <Trash className="mr-2 h-4 w-4" /> Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Category;
