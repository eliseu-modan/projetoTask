import dayjs from "dayjs";

import { DATE_FORMAT } from "../constants/date";

export function formatDate(date, format = DATE_FORMAT) {
  return dayjs(date).format(format);
}
