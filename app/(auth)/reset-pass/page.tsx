"use client";
import axios from "@/app/api/axios";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import StatusForm from "../_components/statusForm";

function ResetPass() {
  const [isLoading, startTransition] = useTransition();

  const [isError, setIsError] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ResetSchema>) => {
    startTransition(async () => {
      setStatusMsg("");
      setIsError(false);

      try {
        await axios.post("auth/reset", data).then((response) => {
          if (response.data.success) {
            setStatusMsg(response.data.success);
            setIsError(false);
          } else {
            setIsError(true);
            setStatusMsg(response.data.error);
          }
        });
      } catch (err: any) {
        setIsError(true);
        setStatusMsg(err.response.data.error);
      }
    });
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Card className="w-[90%] sm:w-[340px]">
        <CardHeader>
          <CardTitle>Forgot Your Password?</CardTitle>
          <CardDescription>Please input your email!</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end flex-col gap-4">
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <Button className="w-full" variant="zee" isLoading={isLoading}>
                Send Reset Verification Email
              </Button>
            </form>
          </Form>
          <StatusForm message={statusMsg} isError={isError} />
          <Button asChild variant="ghost" className="font-bold">
            <Link href="/sign-in">Back to Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default ResetPass;
