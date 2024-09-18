import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pacifico } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_CLIENT_REDIRECT } from "@/routes";

interface authCardProp {
  description: string;
  children: React.ReactNode;
  hrefText: string;
  hrefLink: string;
  loading?: boolean;
}

function AuthCard({
  description,
  children,
  hrefText,
  hrefLink,
  loading = false,
}: authCardProp) {
  const submitProvider = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: DEFAULT_CLIENT_REDIRECT,
    });
  };

  return (
    <Card className="w-[90%] sm:w-[340px]">
      <CardHeader>
        <CardTitle>
          <Link href="/">
            <span
              className={cn(
                pacifico.className,
                "text-lg sm:text-xl text-zee-primary"
              )}
            >
              ZeeTask
            </span>
          </Link>
        </CardTitle>
        <CardDescription className="text-zee-primary font-semibold">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {children}
        <p className="text-xs text-center my-2">Or continue with</p>
        <div className="flex flex-col gap-1">
          <Button
            variant="outline"
            isLoading={loading}
            className="flex gap-2 items-center border-black"
            onClick={() => submitProvider("google")}
          >
            <FcGoogle />
            Continue with Google
          </Button>
          <Button
            isLoading={loading}
            className="flex gap-2 items-center"
            onClick={() => submitProvider("github")}
          >
            <FaGithub />
            Continue with Github
          </Button>
        </div>
        <div className="flex justify-center mt-4">
          <Link
            href={hrefLink}
            className="text-sm text-center text-zee-primary font-bold hover:underline mx-auto"
          >
            {hrefText}
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

export default AuthCard;
