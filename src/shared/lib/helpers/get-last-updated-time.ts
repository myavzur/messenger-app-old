import dayjs from "dayjs";

export const getLastUpdatedTime = (date: Date) => {
	return dayjs(date).format("hh:mm A");
};
