export interface IPaginatedData {
	totalItems: number;
	totalPages: number;
	currentPage: number;
}

export interface IPaginationBody {
	page: number;
	limit: number;
}
