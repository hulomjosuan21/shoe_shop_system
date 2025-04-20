'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import Image from "next/image"
import { addBrand } from "@/app/actions/brand_actions"
import default_image from "@/assets/images/default-image.jpg"

const formSchema = z.object({
    name: z.string().min(5, {
        message: "Username must be at least 2 characters.",
    }),
    brand_image: z
        .any()
        .refine((file) => file !== null || file instanceof File, {
            message: "Image is required and must be a valid file.",
        })
        .refine((file) => file === null || file.size <= 5 * 1024 * 1024, {
            message: "Image must be less than 5 MB.",
        }),
});

export default function BrandPage() {
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            brand_image: null
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        addBrand(values)
    }

    return (
        <main className="">

            <section className="flex m-4 flex-wrap">
                <div className="flex justify-center">
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Username</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter new brand name" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="brand_image"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Brand Image</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        setImagePreview(URL.createObjectURL(file));
                                                        field.onChange(file);
                                                    }
                                                }}
                                            />
                                        </FormControl>
                                        <FormDescription>Image must be a file and less than 5 MB.</FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
                <div className="grid place-content-center flex-[1_1_200px]">
                    <div className="w-[200px] h-[200px] relative rounded overflow-hidden border border-dotted">
                        <Image
                            src={imagePreview || default_image}
                            alt="image-preview"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
            </section>

            <section className="m-4 border rounded overflow-hidden">
                <Table>
                    <TableCaption>Table of brands</TableCaption>
                    <TableHeader className="bg-secondary">
                        <TableRow >
                            <TableHead>Brand ID</TableHead>
                            <TableHead>Brand Name</TableHead>
                            <TableHead>Brand Image/Logo</TableHead>
                            <TableHead className="text-right"></TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell className="font-medium">INV001</TableCell>
                            <TableCell>Paid</TableCell>
                            <TableCell>Credit Card</TableCell>
                            <TableCell className="text-right">$250.00</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>

            </section>
        </main>
    )
}