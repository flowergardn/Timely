import Link from "next/link";
import { Button } from "~/components/ui/button";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div className="max-w-md text-center">
          <h1 className="text-5xl font-bold">Timely</h1>
          <p className="pt-6">
            A discord user-app for managing your friends timezones.
          </p>
        </div>
        <Link href="/invite">
          <Button>Add to Account</Button>
        </Link>
      </div>
    </main>
  );
}
