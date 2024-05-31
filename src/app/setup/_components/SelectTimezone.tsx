"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import * as timezones from "~/lib/timezones";
import { useAtom } from "jotai";
import { userTimezone } from "~/lib/store";

export function SelectTimezone() {
  const allTimezones = timezones.getAll();

  const fmtTimezones = allTimezones.map((tz) => ({
    value: tz.identifier,
    label: `${tz.identifier} (${tz.timezone})`,
  }));

  const [_, setTimezone] = useAtom(userTimezone);

  return (
    <Select onValueChange={setTimezone}>
      <SelectTrigger className="w-[280px]">
        <SelectValue placeholder="Select a timezone" />
      </SelectTrigger>
      <SelectContent>
        {fmtTimezones.map((tz) => (
          <SelectItem key={tz.value} value={tz.value}>
            {tz.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
