"use client";
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
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  SignUpSchema,
  SignUpValidator,
} from "@/lib/validators/auth-validators";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Loading from "@/components/ui/loading";
import Link from "next/link";
import { signUp } from "@/lib/queries/auth";
import { useRouter } from "next/navigation";

interface SignUpFormProps {}
const SignUpForm: React.FC<SignUpFormProps> = ({}) => {
  const router = useRouter();
  const form = useForm<SignUpSchema>({
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpValidator),
  });

  const onSubmit: SubmitHandler<SignUpSchema> = async (values) => {
    const res = await signUp(values);
    if (res.success) {
      toast.success("Success");
      router.refresh();
    } else {
      console.log(res);

      toast.error(res.message ?? "Failed");
    }
  };
  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  return (
    <Card className="m-6 w-full max-w-md space-y-2 md:m-0">
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Join us and start posting random bs</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Please enter your full name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
                    <Input placeholder="*******" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button disabled={isLoading} type="submit" className="mt-4 w-full">
              {isLoading ? <Loading /> : "Sign Up"}
            </Button>
            <Link href={"/signin"}>
              <Button
                variant={"link"}
                type="button"
                className="w-full text-muted-foreground"
              >
                Sign In
              </Button>
            </Link>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default SignUpForm;
