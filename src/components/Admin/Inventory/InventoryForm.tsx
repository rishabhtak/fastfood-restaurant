"use client";
import * as z from "zod";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";

import ImageUpload from "@/components/ImageUpload";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Heading } from "@/components/ui/heading";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { inventoryType } from "@/types/inventoryType";
import { categoryType } from "@/types/categoryType";
import Variants from "./Variants";

const ImgSchema = z.object({
  url: z.string({
    required_error: "Image is required",
  }),
  file: z.instanceof(File).optional(),
  altText: z.string().optional(),
});

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Item Name must be at least 3 characters" })
    .max(70, { message: "Item Name must be at max 50 characters" }),
  image: ImgSchema,
  description: z
    .string()
    .min(3, { message: "Item description must be at least 3 characters" })
    .max(500, { message: "Item Description must be at max 250 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),
  vegNonVeg: z.string().min(1, { message: "Please select Veg or NonVeg" }),
  inStock: z.boolean().default(true),
  variants: z
    .array(
      z.object({
        name: z.string(),
        price: z.coerce.number(),
      })
    )
    .min(1, { message: "At least one variant is required" }),
  addons: z
    .array(
      z.object({
        name: z.string(),
        price: z.coerce.number(),
      })
    )
    .optional(),
});

type InventoryFormValues = z.infer<typeof formSchema>;

interface InventoryFormProps {
  initialData: inventoryType | null;
}
interface VegNonVeg {
  id: string;
  name: string;
}

const vegNonVeg: VegNonVeg[] = [
  { id: "veg", name: "Veg" },
  { id: "nonveg", name: "NonVeg" },
];

export const InventoryForm: React.FC<InventoryFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const [categories, setCategories] = useState<categoryType[]>([]);

  const title = initialData ? "Edit product" : "Create product";
  const action = initialData ? "Save changes" : "Create";

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

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        image: {},
        category: "",
        vegNonVeg: "Veg",
        variants: [],
        addons: [],
        inStock: true,
      };

  const {
    formState: { errors },
    control,
    handleSubmit,
    watch,
  } = useForm<InventoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = async (data: InventoryFormValues) => {
    try {
      setLoading(true);

      let imageData = data.image;

      let uploadedImage = null;
      let deletedImage = null;

      // If updating, handle image deletions
      if (initialData?.image) {
        // Check if the existing image is different from the new one
        if (initialData?.image?.url !== imageData?.url) {
          deletedImage = initialData?.image;

          // Delete the image from Cloudinary
          await fetch(`/api/uploadImage/?url=${deletedImage.url}`, {
            method: "DELETE",
          });
        }
      }

      // If there's a new image and it doesn't have a alttext (means it's a fresh upload)
      if (imageData?.file) {
        // Upload the image to Cloudinary
        const formData = new FormData();
        formData.append("file", imageData?.file); // New image to upload
        formData.append("upload_preset", "fastfood_testing");

        const response = await fetch(`/api/uploadImage`, {
          method: "POST",
          body: formData,
        });

        const result = await response.json();
        uploadedImage = {
          url: result?.uploadedImageData?.secure_url,
          altText: result?.uploadedImageData?.original_filename,
        };
      }

      // If no new image was uploaded, keep the existing one
      const finalImage = uploadedImage ? uploadedImage : initialData?.image;

      // Prepare the final inventory data, including image metadata
      const inventoryData = {
        ...data,
        image: finalImage,
        // price: parseFloat(data.price.toString()),
      };

      // Sending data to your API using fetch (for update or create)
      if (initialData?.id) {
        const id = initialData.id;
        // Update inventory
        const res = await fetch(`/api/inventory`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            inventoryData,
          }),
        });
        const data = await res.json();
        if (data.status === "400" || data.status === "500") {
          throw new Error(res.statusText);
        }
      } else {
        // Create new product
        const res = await fetch(`/api/inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventoryData),
        });
        const data = await res.json();
        if (data.status === "400" || data.status === "500") {
          throw new Error(res.statusText);
        }
      }

      router.push(`/admin/dashboard/inventory`);
      router.refresh();
      toast({
        variant: "default",
        duration: 2000,
        title: initialData
          ? "Inventory updated successfully"
          : "Inventory created successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        duration: 4000,
        title: "Uh oh! Something went wrong.",
        description:
          "There was a problem with your request. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="loader-container">
          <span className="loader"></span>
        </div>
      )}
      <div
        className={`flex items-center justify-between ${
          loading ? "opacity-50 pointer-events-none" : ""
        }`}
      >
        <Heading title={title} />
      </div>
      <Separator />
      <Form
        {...useForm({
          resolver: zodResolver(formSchema),
          defaultValues,
        })}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8">
          <div className="gap-8 md:grid md:grid-cols-2 mb-10">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="Item name"
                        maxLength={70}
                        {...field}
                      />
                      <span className="absolute -bottom-6 right-0 text-sm text-gray-500">
                        {watch("name").length}/70
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors && <span>{errors?.name?.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Textarea
                        placeholder="Item description"
                        maxLength={500}
                        {...field}
                      />
                      <span className="absolute -bottom-6 right-0 text-sm text-gray-500">
                        {watch("description").length}/500
                      </span>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors && <span>{errors?.description?.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image *</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      value={field.value}
                      onRemove={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors && <span>{errors?.image?.url?.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category *</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder="Select a category"
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {/* @ts-ignore  */}
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.name}>
                          <span className="capitalize">{category.name}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage>
                    {errors && <span>{errors?.category?.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="variants"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Variants *</FormLabel>
                  <FormControl>
                    <Variants
                      placeholder="Small or Normal or Half"
                      value={field.value}
                      onChangeVariant={field.onChange}
                      onRemoveVariant={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors && <span>{errors?.variants?.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="addons"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Addons (Optional)</FormLabel>
                  <FormControl>
                    <Variants
                      placeholder="eg. Cheese Slice"
                      value={field.value || []}
                      onChangeVariant={field.onChange}
                      onRemoveVariant={field.onChange}
                    />
                  </FormControl>
                  <FormMessage>
                    {errors && <span>{errors?.addons?.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="inStock"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center space-x-2 mt-10">
                      <Switch
                        id="instock"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <label htmlFor="instock">In stock</label>
                    </div>
                  </FormControl>
                  <FormMessage>
                    {errors.inStock && <span>{errors.inStock.message}</span>}
                  </FormMessage>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="vegNonVeg"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex justify-start mt-10"
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      {vegNonVeg.map((elem) => (
                        <label key={elem.id} className="relative">
                          <input
                            type="radio"
                            name="vegNonVeg"
                            value={elem.name}
                            className="absolute opacity-0"
                            onChange={() => field.onChange(elem.name)}
                            checked={field.value === elem.name}
                          />
                          <span
                            className={`${
                              field.value === elem.name
                                ? "bg-blue-200 text-blue-700 rounded-lg"
                                : "bg-white text-gray-700 rounded-lg"
                            } px-6 py-2 border border-gray-300 cursor-pointer transition`}
                          >
                            {elem.name}
                          </span>
                        </label>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage>
                    {errors.vegNonVeg && (
                      <span>{errors.vegNonVeg.message}</span>
                    )}
                  </FormMessage>
                </FormItem>
              )}
            />
          </div>
          <Button className="ml-auto" type="submit">
            {action}
          </Button>
          <Link href={`/admin/dashboard/inventory`}>
            <Button variant="outline" className="ml-2">
              Cancel
            </Button>
          </Link>
        </form>
      </Form>
    </>
  );
};
