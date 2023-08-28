"use client";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validation/user.validation";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { FileUpload } from "../fileUpload";

type Props = {
  user: {
    username: string;
    imgUrl: string;
  };
};

const CreateServerModal = ({ user }: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: user.username || "",
      imgUrl: user.imgUrl || "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof userSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open>
      <DialogContent className="bg-zinc-300 text-black p-0 overflow-hidden">
        <DialogHeader className="pt-8 px-6 text-black">
          <DialogTitle className="text-2xl">Customize a server</DialogTitle>
          <DialogDescription className="text-center text-gray-700">
            Give your server a personality with a name and an image. You always
            change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="space-y-8 px-6">
              <div className="flex items-center justify-center text-center">
                {/* TODO: Image Upload  */}
                <FormField
                  control={form.control}
                  name="imgUrl"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2.5 justify-center items-center">
                      <FormLabel className="text-center font-bold uppercase">
                        Upload Server Photo
                      </FormLabel>
                      <FormControl className="">
                        <FileUpload
                          endpoint="serverImage"
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="uppercase font-bold text-xs">
                      Server Name
                    </FormLabel>
                    <FormControl className="text-white">
                      <Input
                        disabled={isLoading}
                        className="focus-visible:ring-0 focus-visible:ring-offset-0"
                        placeholder="John Doe..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter className="bg-gray-500 px-6 py-4 ">
              <Button variant={"primary"} disabled={isLoading}>
                Create
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
