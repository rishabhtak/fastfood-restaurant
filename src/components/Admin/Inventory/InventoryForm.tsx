"use client";
import * as z from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import ImageUpload from "@/components/ImageUpload";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { inventoryType } from "@/types/inventoryType";
import { url } from "inspector";
const ImgSchema = z.object({
  url: z.string(),
  file: z.instanceof(File),
  altText: z.string().optional(),
});
export const IMG_MAX_LIMIT = 1;
const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Item Name must be at least 3 characters" }),
  image: ImgSchema,
  description: z
    .string()
    .min(3, { message: "Item description must be at least 3 characters" }),
  price: z.coerce.number(),
  category: z.string().min(1, { message: "Please select a category" }),
});

type InventoryFormValues = z.infer<typeof formSchema>;

interface InventoryFormProps {
  initialData: any | null;
  categories: any;
}

export const InventoryForm: React.FC<InventoryFormProps> = ({
  initialData,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const title = initialData ? "Edit product" : "Create product";
  // const description = initialData ? "Edit a product." : "Add a new product";
  const toastMessage = initialData ? "Product updated." : "Product created.";
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
    // resolver: zodResolver(formSchema),
    defaultValues,
  });
  const onSubmit = async (data: InventoryFormValues) => {
    try {
      setLoading(true);

      let imageData = data.image; // Since only one image is allowed

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
      if (!imageData?.altText) {
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
        price: parseFloat(data.price.toString()),
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
        const response = await res.json();
        console.log("update", response);
      } else {
        console.log("inventoryData", inventoryData);
        // Create new product
        const res = await fetch(`/api/inventory`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inventoryData),
        });
        const response = await res.json();
        console.log("inventoryadd", response);
      }

      // router.refresh();
      //  router.push(`/admin/dashboard/inventory`);
      toast({
        variant: "success",
        title: initialData
          ? "Product updated successfully"
          : "Product created successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    } finally {
      setLoading(false);
    }
  };

  const triggerImgUrlValidation = () => form.trigger("image");

  return (
    <>
      {/* <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      /> */}
      <div className="flex items-center justify-between">
        <Heading title={title} />
        {/* {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )} */}
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
                    <Input
                      disabled={loading}
                      placeholder="Item name"
                      {...field}
                    />
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
                    <Textarea
                      disabled={loading}
                      placeholder="Item description"
                      {...field}
                    />
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
                    <Input type="number" disabled={loading} {...field} />
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
                    disabled={loading}
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
                        <SelectItem key={category._id} value={category._id}>
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
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
