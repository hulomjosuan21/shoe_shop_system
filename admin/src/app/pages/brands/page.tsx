'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import default_image from "@/assets/images/default-image.jpg"
import Link from "next/link";

export interface Brand {
    brand_id: string,
    name: string,
    brand_image: string | null,
    created_at: Date | null,
    updated_at: Date | null
}

type BrandResponse<T> = {
    message: string;
    brands: T;
}

export const brandSchema = z.object({
    name: z.string().min(1, "Brand name is required"),
    brand_image: z
        .any()
        .refine((file) => file instanceof File || file === null, {
            message: "Brand image must be a file",
        })
        .refine(
            (file) => !file || file.type.startsWith("image/"),
            { message: "File must be an image" }
        )
        .nullable(),
});

type BrandFormValues = z.infer<typeof brandSchema>;

const getBrands = async (): Promise<BrandResponse<[Brand]>> => {
    const { data } = await axios.get<BrandResponse<[Brand]>>('http://localhost:5000/shoe/all/brand');
    return data;
};

const addBrand = async (formData: FormData): Promise<BrandResponse<Brand>> => {
    const { data } = await axios.post<BrandResponse<Brand>>('http://localhost:5000/shoe/new/brand', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return data;
};

export default function BrandsPage() {

    const { data, isPending, isError, error } = useQuery({
        queryKey: ['brands'],
        queryFn: getBrands
    });

    const queryClient = useQueryClient();

    const [preview, setPreview] = useState<string | null>(null);
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            form.setValue("brand_image", file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const form = useForm<BrandFormValues>({
        resolver: zodResolver(brandSchema),
        defaultValues: {
            name: "",
            brand_image: null,
        },
    });

    async function onSubmit(values: BrandFormValues) {
        const formData = new FormData();

        formData.append('name', values.name);

        if (values.brand_image) {
            formData.append('brand_image', values.brand_image);
        }

        try {
            await addBrand(formData);
            toast.success("Brand added successfully!");
            queryClient.invalidateQueries({ queryKey: ['brands'] });
        } catch {
            throw new Error("Error adding brand!");
        }
    }

    if (isError && error instanceof Error) {
        throw new Error(error.message);
    }

    const rowLoading = (
        <TableRow>
            <TableCell colSpan={4} className="text-center py-4">
                Fetching all brands...
            </TableCell>
        </TableRow>
    );

    return (
        <div className="">

            <Card className="m-2">
                <CardHeader className="border-b">
                    <span className="font-semibold">Add New Brand</span>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="">

                            <div className="flex items-center justify-between gap-2 flex-wrap mb-2">
                                <div className="flex justify-start items-center gap-2 flex-wrap flex-1">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Brand Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter brand name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="brand_image"
                                        render={() => (
                                            <FormItem>
                                                <FormLabel>Brand Image/Logo</FormLabel>
                                                <FormControl>
                                                    <Input type="file" accept="image/*" onChange={handleFileChange} />
                                                </FormControl>
                                                <FormMessage />

                                            </FormItem>
                                        )}
                                    />

                                </div>

                                <div className="flex justify-center flex-1">
                                    <div className={!preview ? `w-[100px] h-[100px] border border-dotted rounded-md` : ''}>
                                        {preview && (
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                width={100}
                                                height={100}
                                                className="mt-2 rounded-md object-cover"
                                            />
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="mt-2">
                                <Button type="submit">Save Brand</Button>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>

            <div className="m-2 border rounded-md bg-card shadow-sm text-card-foreground">
                <Table className="">
                    <TableCaption>A list of shoe brands.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Brand ID</TableHead>
                            <TableHead>Brand Name</TableHead>
                            <TableHead>Brand Image/Logo</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {isPending ? rowLoading : data?.brands.map((brand, index) => (<TableRow key={index}>
                            <TableCell className="font-medium">{brand.brand_id}</TableCell>
                            <TableCell>{brand.name}</TableCell>
                            <TableCell>
                                <div className="w-16 h-16 relative">
                                    {
                                        brand.brand_image ? (
                                            <Link href={brand.brand_image} target="_blank   ">
                                                <Image
                                                    src={brand.brand_image || default_image}
                                                    alt={`${brand.name} logo`}
                                                    fill
                                                    className="object-cover rounded"
                                                />
                                            </Link>
                                        ) : (
                                            <Image
                                                src={default_image}
                                                alt={'logo'}
                                                fill
                                                className="object-cover rounded"
                                            />
                                        )
                                    }
                                </div>
                            </TableCell>
                        </TableRow>))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2}>Total Brands</TableCell>
                            <TableCell className="text-right">{data?.brands.length}</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </div>
    )
}
