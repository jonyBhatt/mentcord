"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema } from "@/lib/validation/user.validation";
import { useForm } from "react-hook-form";

const CreateServerModal = () => {
  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      username: "",
    },
  });

  const isLoading = form.formState.isSubmitting;
  async function onSubmit(values: z.infer<typeof userSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
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
      </DialogContent>
    </Dialog>
  );
};

export default CreateServerModal;
