import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

function AuthError() {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <Card>
        <CardHeader>
          <CardTitle>Something went wrong!</CardTitle>
          <CardDescription>
            Try to use different login provider!
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-end">
          <Button asChild variant="destructive">
            <Link href="/sign-in">Back to Sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default AuthError;
