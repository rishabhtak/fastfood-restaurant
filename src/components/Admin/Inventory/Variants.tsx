import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as z from "zod";

export interface Variant {
  name: string;
  price: number;
}

interface VariantsProps {
  placeholder: string;
  value: Variant[];
  onChangeVariant: (variants: Variant[]) => void;
  onRemoveVariant: (variants: Variant[]) => void;
}

const variantSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .max(70, { message: "Name must be at max 20 characters" }),
  price: z
    .number()
    .positive("Price must be a positive number")
    .nonnegative("Price must be a valid number"),
});

const Variants: React.FC<VariantsProps> = ({
  placeholder,
  value,
  onChangeVariant,
  onRemoveVariant,
}) => {
  const [variantName, setVariantName] = useState<string>("");
  const [variantPrice, setVariantPrice] = useState<string>("");
  const [errors, setErrors] = useState<{ name?: string; price?: string }>({});

  const addVariant = (): void => {
    // Convert price to number for validation
    const parsedPrice = parseFloat(variantPrice);

    // Validate using Zod
    const result = variantSchema.safeParse({
      name: variantName,
      price: parsedPrice,
    });

    if (!result.success) {
      // Collect errors from validation result
      const newErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: newErrors.name ? newErrors.name[0] : undefined,
        price: newErrors.price ? newErrors.price[0] : undefined,
      });
      return;
    }

    // Clear errors if validation passes
    setErrors({});

    // Add the variant
    onChangeVariant([...value, { name: variantName, price: parsedPrice }]);
    setVariantName("");
    setVariantPrice("");
  };

  const removeVariant = (index: number): void => {
    const filteredVariants = value.filter((_, i) => i !== index);
    onRemoveVariant(filteredVariants);
  };

  const handleVariantNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const value = e.target.value;
    if (value.length <= 20) {
      setVariantName(value);
    }
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-10 lg:space-y-0">
        <div className="flex flex-col space-y-5">
          <div className="relative flex w-full mb-10 md:mb-0">
            <Input
              className="flex-grow"
              placeholder={placeholder}
              type="text"
              value={variantName}
              onChange={handleVariantNameChange}
            />
            <span className="absolute right-0 -bottom-6 text-sm text-gray-500">
              {variantName?.length}/20
            </span>
          </div>
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>

        <div className="flex flex-col space-y-5">
          <Input
            className="flex-grow"
            placeholder="Price"
            type="number"
            value={variantPrice}
            onChange={(e) => setVariantPrice(e.target.value)}
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}
        </div>
        <Button className="max-sm:mt-5" type="button" onClick={addVariant}>
          Add
        </Button>
      </div>

      {value?.length > 0 && (
        <ul>
          {value?.map((variant, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-gray-100 rounded-md capitalize mt-10"
            >
              <span>
                {variant.name} - ₹{variant.price.toFixed(2)}
              </span>
              <Button
                variant="destructive"
                onClick={() => removeVariant(index)}
              >
                Delete
              </Button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default Variants;
