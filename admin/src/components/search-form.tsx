'use client'
import { Bot } from "lucide-react"
import Form from "next/form"
import { Label } from "@/components/ui/label"
import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarInput,
} from "@/components/ui/sidebar"
import { sendInstruction } from "@/app/actions/process_actions"
import { useRouter } from "next/navigation"
import { useTransition } from "react"

export function SearchForm() {
    const router = useRouter()

    const [isPending, startTransition] = useTransition();

    const handleSubmit = (formData: FormData) => {
        startTransition(async () => {
            const res = await sendInstruction(formData)
            if (res) {
                router.push(res)
            }
        })
    }

    return (
        <SidebarGroup className="py-0">
            <SidebarGroupContent className="relative">
                <Form action={handleSubmit}>
                    <Label htmlFor="search" className="sr-only">
                        Search
                    </Label>
                    <SidebarInput
                        id="search"
                        placeholder={'Go to'}
                        className="pl-8"
                        name="instruction"
                        disabled={isPending}
                    />
                    <Bot className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
                </Form>
            </SidebarGroupContent>
        </SidebarGroup>
    )
}
