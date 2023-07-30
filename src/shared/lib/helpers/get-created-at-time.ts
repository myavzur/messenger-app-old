import dayjs from "dayjs";

export const getCreatedAtTime = (date: Date) => {
	return dayjs(date).format("hh:mm");
};
