"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import StatusForm from "../_components/statusForm";
import axios from "@/app/api/axios";

function Verification() {
  const [isLoading, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isError, setIsError] = useState<boolean>(false);
  const [statusMsg, setStatusMsg] = useState<string>("");
  const effectRun = useRef(false);

  const submitToken = useCallback(() => {
    if (!token) {
      setIsError(true);
      setStatusMsg("Invalid Token!");
    }

    startTransition(async () => {
      try {
        await axios.post("auth/vtoken", { token }).then((response) => {
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
  }, []);

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_NODE_ENV === "prod" || effectRun.current) {
      submitToken();
    }
    return () => {
      effectRun.current = true;
    };
  }, []);
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Card className="w-[90%] sm:w-[340px]">
        <CardHeader>
          <CardTitle>Verification</CardTitle>
          <CardDescription>
            Confirming your verification to activate your account, please wait!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          {isLoading && (
            <div className="flex gap-2 justify-center">
              <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-load"></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-load"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce-load"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          )}
          <StatusForm isError={isError} message={statusMsg} />
          <Button
            asChild
            variant="zee"
            disabled={isLoading}
            className="w-fit self-end"
          >
            <Link href="/sign-in">Back to Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Verification;
