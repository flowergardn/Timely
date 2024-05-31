import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { SelectTimezone } from "../_components/SelectTimezone";
import Form from "../_components/Form";
import { db } from "~/server/db";
import { sessions } from "~/server/db/schema";
import { eq } from "drizzle-orm";

export default async function Setup({
  params: { id: setupId },
}: {
  params: { id: string };
}) {
  const session = await db
    .select()
    .from(sessions)
    .where(eq(sessions.id, setupId));

  const SetupCard = () => {
    if (session.length === 0) {
      return (
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Setup Timely</CardTitle>
            <CardDescription>
              This session doesn&apos;t exist!
              <br />
              Please run <code>/set_timezone</code> within Timely.
            </CardDescription>
          </CardHeader>
        </Card>
      );
    }

    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Setup Timely</CardTitle>
          <CardDescription>
            Find your timezone in the list below and select it to set your
            timezone.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <SelectTimezone />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Form setupId={setupId} />
        </CardFooter>
      </Card>
    );
  };

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <SetupCard />
    </div>
  );
}
