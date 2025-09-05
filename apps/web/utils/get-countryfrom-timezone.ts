import * as ct from "countries-and-timezones";

const getCountryFromTimezone = (timeZone: string) => {
  if (!timeZone) return null;
  const timeZoneInfo = ct.getTimezone(timeZone);
  if (!timeZoneInfo?.countries.length) return null;

  const countryCode = timeZoneInfo.countries[0];

  const country = ct.getCountry(countryCode as string);

  return {
    country,
    name: country?.name,
  };
};

export default getCountryFromTimezone;
