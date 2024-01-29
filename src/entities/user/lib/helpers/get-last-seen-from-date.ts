import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const ONE_HOUR_IN_MINUTES = 60;
const ONE_DAY_IN_MINUTES = 1440;
const ONE_YEAR_IN_MINUTES = 525600;

export const getLastSeenFromDate = (date: Date) => {
	// return dayjs(date).fromNow();
	const nowDate = dayjs();
	const lastSeenDate = dayjs(date);

	const timeDifference = nowDate.diff(lastSeenDate, "minute");

	if (timeDifference <= 5) {
		return "last seen recently";
	}

	if (timeDifference < ONE_HOUR_IN_MINUTES) {
		return `last seen ${timeDifference} minutes ago`;
	}

	if (timeDifference < ONE_DAY_IN_MINUTES) {
		const hours = Math.floor(timeDifference / ONE_HOUR_IN_MINUTES);
		return `last seen ${hours} ${hours === 1 ? "hour" : "hours"} ago`;
	}

	if (timeDifference < ONE_YEAR_IN_MINUTES) {
		const days = Math.floor(timeDifference / ONE_DAY_IN_MINUTES);
		return `last seen ${days} ${days === 1 ? "day" : "days"} ago`;
	}

	const years = Math.floor(timeDifference / ONE_YEAR_IN_MINUTES);
	return `last seen ${years} ${years === 1 ? "year" : "years"} ago`;
};
