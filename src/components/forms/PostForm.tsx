"use client";

import { useModal } from "@/hooks/use-modal";
import { PostSchema, PostValidator } from "@/lib/validators/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { type Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent } from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { createPost, updatePost } from "@/lib/queries/post";
import { Input } from "../ui/input";
import { InputTags } from "../ui/input-tags";

interface PostFormProps {
  defaultData?: Post;
}
const PostForm: React.FC<PostFormProps> = ({ defaultData }) => {
  const { setClose } = useModal();
  const router = useRouter();
  const form = useForm<PostSchema>({
    mode: "onChange",
    resolver: zodResolver(PostValidator),
    defaultValues: {
      title: defaultData?.title || "",
      content: defaultData?.content || "",
      topics: defaultData?.topics || [],
    },
  });
  const onSubmit: SubmitHandler<PostSchema> = async (values) => {
    let res;
    // const values = form.getValues();

    if (defaultData) {
      res = await updatePost(defaultData.id, values);
    } else {
      res = await createPost(values);
    }
    if (res.success && res.data) {
      toast.success(res.data.title + "successful");
      form.reset();
      router.refresh();
    } else {
      toast.error(res.message || "Something went wrong!");
    }
    setClose();
  };
  const isLoading = form.formState.isLoading || form.formState.isSubmitting;
  return (
    <Card className="w-full border-0 shadow-none">
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              disabled={isLoading}
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Input placeholder="Content" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              disabled={isLoading}
              control={form.control}
              name="topics"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topics</FormLabel>
                  <FormControl>
                    <InputTags {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
export default PostForm;
