import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Form } from "@/components/ui/form";

export default function CategoriesPage() {
    return (
        <div className="">
            <section>
                <Card className="m-2">
                    <CardHeader className="border-b">
                        <span className="font-semibold">Add New Category</span>
                    </CardHeader>
                    <CardContent>
                        {/* <Form>
                            
                        </Form> */}
                    </CardContent>
                </Card>
            </section>
        </div>
    )
}