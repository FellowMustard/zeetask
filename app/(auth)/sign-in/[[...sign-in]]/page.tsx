"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import AuthCard from "../../_components/AuthCard";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "@/app/api/axios";
import StatusForm from "../../_components/statusForm";
import Link from "next/link";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

function SignIn() {
  const searchParams = useSearchParams();

  const [isLoading, startTransition] = useTransition();
  const router = useRouter();

  const [isTwoFA, setIsTwoFA] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");

  useEffect(() => {
    const callbackError = searchParams?.get("error");
    if (callbackError === "OAuthAccountNotLinked") {
      setIsError(true);
      setStatusMsg(
        "Email used in another provider, try to use another login method!"
      );
    }
  }, [searchParams]);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
      code: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof LoginSchema>) => {
    startTransition(async () => {
      setStatusMsg("");
      setIsError(false);
      try {
        await axios.post("auth", data).then((response) => {
          if (response.data.success) {
            setStatusMsg(response.data.success);
            setIsError(false);

            router.push(response.data.redirect);
          } else if (response.data.twoFA) {
            setIsTwoFA(true);
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
      <AuthCard
        description="sign in to continue"
        hrefText="Create an account"
        hrefLink="/register"
        loading={isLoading}
      >
        <div className="mt-6">
          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              {isTwoFA && (
                <>
                  <p className="text-xs text-zee-primary font-bold">
                    Please Check Your Email for 2FA Code!
                  </p>
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <InputOTP maxLength={6} {...field}>
                            <InputOTPGroup className="w-full flex justify-center ">
                              <InputOTPSlot index={0} />
                              <InputOTPSlot index={1} />
                              <InputOTPSlot index={2} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup className="w-full flex justify-center">
                              <InputOTPSlot index={3} />
                              <InputOTPSlot index={4} />
                              <InputOTPSlot index={5} />
                            </InputOTPGroup>
                          </InputOTP>
                        </FormControl>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </>
              )}
              {!isTwoFA && (
                <>
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
                  <Button
                    variant="link"
                    size="sm"
                    asChild
                    className="font-bold px-0 text-zee-primary"
                  >
                    <Link href="/reset-pass" className=" h-fit">
                      Forgot Password ?
                    </Link>
                  </Button>
                </>
              )}

              <StatusForm message={statusMsg} isError={isError} />
              <Button className="w-full" variant="zee" isLoading={isLoading}>
                {isTwoFA ? "Confirm" : "Sign In"}
              </Button>
            </form>
          </Form>
        </div>
      </AuthCard>
    </div>
  );
}

export default SignIn;
