export const generateWidths = (data: number[]) => {
	// widthの降順でソート
	const sortedData = data.sort((a, b) => a - b);
	return sortedData;
};
