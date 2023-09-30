import dayjs from "dayjs";

export const formatUpdatedDate = (date: Date) => {
	const now = dayjs();
	const targetDate = dayjs(date);

	if (now.isSame(targetDate, "day")) {
		return `${targetDate.format("HH:mm")}`;
	} else {
		return targetDate.format("MMM D");
	}
};
