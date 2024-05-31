"use client";

import { useAtom } from "jotai";
import { toast } from "sonner";
import { Button } from "~/components/ui/button";
import { userTimezone } from "~/lib/store";
import { submitTimezone } from "../_actions/submitTimezone";
import { useFormStatus } from "react-dom";
import Link from "next/link";

export default function Form(props: { setupId: string }) {
  const [timezone] = useAtom(userTimezone);
  const { pending } = useFormStatus();

  const clientFunction = async () => {
    try {
      await submitTimezone(timezone, props.setupId);
      toast("Successfully set timezone");
      setTimeout(() => {
        location.href = "/";
      }, 1500);
    } catch (e: unknown) {
      if (e instanceof Error) toast(e.message);
      else toast("Something went wrong");
    }
  };

  return (
    <>
      <form action={clientFunction}>
        <div className="space-x-2">
          <Button type="submit" disabled={pending || !timezone}>
            Submit
          </Button>
          <Link href="/">
            <Button variant="outline">Cancel</Button>
          </Link>
        </div>
      </form>
    </>
  );
}
