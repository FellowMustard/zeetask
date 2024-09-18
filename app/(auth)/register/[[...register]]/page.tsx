"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import AuthCard from "../../_components/AuthCard";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState, useTransition } from "react";
import axios from "@/app/api/axios";
import StatusForm from "../../_components/statusForm";

function Register() {
  const [isLoading, startTransition] = useTransition();

  const [isError, setIsError] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RegisterSchema>) => {
    startTransition(async () => {
      setStatusMsg("");
      setIsError(false);
      try {
        await axios.post("auth/register", data).then((response) => {
          if (response.data.success) {
            setIsError(false);
            setStatusMsg(response.data.success);
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
      <AuthCard
        description="create your new account now"
        hrefText="Already have an account?"
        hrefLink="/sign-in"
        loading={isLoading}
      >
        <div className="mt-6">
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <StatusForm message={statusMsg} isError={isError} />
              <Button className="w-full" variant="zee" isLoading={isLoading}>
                Create new account
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </div>
  );
}

export default Register;
