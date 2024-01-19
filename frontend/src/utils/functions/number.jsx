import { CURRENCY_FORMAT, NUMBER_LOCALE } from "../constants/number";

export function formatNumber(value) {
  return value?.toLocaleString(NUMBER_LOCALE, {});
}

export function formatMoney(value) {
  return parseFloat(value).toLocaleString("pt-br", {
    style: "currency",
    currency: CURRENCY_FORMAT,
  });
}
