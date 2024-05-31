import timezones from "../timezones.json";

import dayjs from "dayjs";
import utcPlugin from "dayjs/plugin/utc";
import timezonePlugin from "dayjs/plugin/timezone";

dayjs.extend(utcPlugin);
dayjs.extend(timezonePlugin);

type TimezoneEntry = { identifier: string; timezone: string };

const jsonData: TimezoneEntry[] = timezones as unknown as TimezoneEntry[];

function get(timezone: string): TimezoneEntry | null {
  return jsonData.find((tz) => tz.identifier === timezone) ?? null;
}

const isValid = (timezone: string) => get(timezone) !== null;
const getTime = (timezone: string) => dayjs().tz(timezone);
const getAll = () => jsonData;

export { get, isValid, getTime, getAll };
