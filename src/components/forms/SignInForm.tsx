"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignInSchema,
  SignInValidator,
} from "@/lib/validators/auth-validators";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { toast } from "sonner";
import { signIn } from "@/lib/queries/auth";
import Link from "next/link";
interface SignInFormProps {}
const SignInForm: React.FC<SignInFormProps> = ({}) => {
  const router = useRouter();
  //   React Hook Form
  const form = useForm<SignInSchema>({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignInValidator),
  });
  const onSubmit: SubmitHandler<SignInSchema> = async (values) => {
    const response = await signIn(values);
    if (response.success) {
      toast.success(response.message);
      router.refresh();
    } else {
      toast.error(response.message ?? "Failed to sign in");
    }
  };

  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  return (
    <Card className="m-6 w-full max-w-md space-y-2 md:m-0">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Welcome Back!</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="example@mail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              disabled={isLoading}
              variant={"ghost"}
              type="submit"
              className="mt-4 w-full"
            >
              {isLoading ? (
                <Loading className={"text-primary-foreground"} />
              ) : (
                "Sign In"
              )}
            </Button>
            <Link href={"/signup"}>
              <Button
                variant={"link"}
                type="button"
                className="w-full text-muted-foreground"
              >
                Sign Up
              </Button>
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default SignInForm;
