import dayjs from "dayjs";

export const formatUpdatedDate = (date: Date) => {
	const now = dayjs();
	const targetDate = dayjs(date);

	if (now.isSame(targetDate, "day")) {
		return `Today, ${targetDate.format("HH:mm")}`;
	} else if (now.subtract(1, "day").isSame(targetDate, "day")) {
		return `Yesterday, ${targetDate.format("HH:mm")}`;
	} else {
		return targetDate.format("D MMMM YYYY, HH:mm");
	}
};
