import timezones from "../../timezones.json";

export function GET() {
  return Response.json(timezones);
}
