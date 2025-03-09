"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/actions/auth";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginFormSchema } from "@/lib/definitions";

export function LoginForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  const handleLogin = async (values: z.infer<typeof LoginFormSchema>) => {
    setIsSubmitting(true);

    const result = await login(values);
    if (result.success) {
      startTransition(() => {
        // Force revalidation of current route
        router.refresh();
        // Navigate to search page
        router.push("/search");
      });
      setIsSubmitting(false);
    }
  };

  const isLoading = isPending || isSubmitting;

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-center items-center"
        onSubmit={form.handleSubmit(handleLogin)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="border p-2 mb-4">
              <Label htmlFor="name">Name</Label>
              <FormControl>
                <Input type="text" placeholder="dogfinder" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        {form.formState.errors.name?.message && (
          <p className="text-red-500 text-sm mb-2">
            {form.formState.errors.name.message}
          </p>
        )}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="border p-2 mb-4">
              <Label htmlFor="email">Email</Label>
              <FormControl>
                <Input
                  type="text"
                  placeholder="dogfinder@example.com"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        {form.formState.errors.email?.message && (
          <p className="text-red-500 text-sm mt-0 mb-2">
            {form.formState.errors.email.message}
          </p>
        )}
        <button
          className="bg-purple-800 cursor-pointer text-white px-4 py-2 rounded-sm"
          disabled={isLoading}
          type="submit"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
    </Form>
  );
}
