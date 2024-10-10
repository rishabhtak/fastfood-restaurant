"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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

const ImgSchema = z.object({
  url: z.string(),
  file: z.instanceof(File).optional(),
  altText: z.string().optional(),
});

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Item Name must be at least 3 characters" }),
  image: ImgSchema,
  description: z
    .string()
    .min(3, { message: "Item description must be at least 3 characters" }),
  price: z.coerce.number().min(1, { message: "Please enter a vaild price" }),
  category: z.string().min(1, { message: "Please select a category" }),
});

type InventoryFormValues = z.infer<typeof formSchema>;

interface InventoryFormProps {
  initialData: inventoryType | null;
}

interface Categories {
  id: string;
  name: string;
}

const categories: Categories[] = [
  { id: "shirts", name: "shirts" },
  { id: "pants", name: "pants" },
];

export const InventoryForm: React.FC<InventoryFormProps> = ({
  initialData,
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const [loading, setLoading] = useState<boolean>(false);
  const title = initialData ? "Edit product" : "Create product";
  const action = initialData ? "Save changes" : "Create";

  const defaultValues = initialData
    ? initialData
    : {
        name: "",
        description: "",
        price: 0,
        image: {},
        category: "",
      };

  const form = useForm<InventoryFormValues>({
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
        formData.append("upload_preset", "uploadimage_cloudinary");

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
        if (!res.ok) {
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

        if (!res.ok) {
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

  const triggerImgUrlValidation = () => form.trigger("image");

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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-8"
        >
          <div className="gap-8 md:grid md:grid-cols-3">
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Images</FormLabel>
                  <FormControl>
                    <ImageUpload
                      onChange={field.onChange}
                      value={field.value}
                      onRemove={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Item name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Item description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Item Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
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
