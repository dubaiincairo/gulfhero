import React from "react";
import { DatePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export const PMS_DATE_FORMAT = "DD/MM/YYYY";

function parseDate(value, format) {
  if (!value) return null;
  const parsed = dayjs(value, format, true);
  return parsed.isValid() ? parsed : null;
}

export function PmsDatePicker({ className = "", defaultValue, format = PMS_DATE_FORMAT, onChange, value, ...props }) {
  const controlledValue = value === undefined ? undefined : parseDate(value, format);
  const initialValue = value === undefined ? parseDate(defaultValue, format) : undefined;

  return <DatePicker
    {...props}
    allowClear={props.allowClear ?? false}
    className={`pms-date-picker ${className}`.trim()}
    classNames={{ popup: { root: "pms-date-popup" } }}
    defaultValue={initialValue}
    format={format}
    onChange={(date) => onChange?.(date ? date.format(format) : "")}
    value={controlledValue}
  />;
}

export function PmsDateRangePicker({ className = "", defaultValue, format = PMS_DATE_FORMAT, onChange, value, ...props }) {
  const controlledValue = value === undefined ? undefined : value.map((date) => parseDate(date, format));
  const initialValue = value === undefined && defaultValue ? defaultValue.map((date) => parseDate(date, format)) : undefined;

  return <DatePicker.RangePicker
    {...props}
    allowClear={props.allowClear ?? false}
    className={`pms-date-picker pms-date-range-picker ${className}`.trim()}
    classNames={{ popup: { root: "pms-date-popup" } }}
    defaultValue={initialValue}
    format={format}
    onChange={(dates) => onChange?.(dates ? dates.map((date) => date.format(format)) : [])}
    value={controlledValue}
  />;
}
