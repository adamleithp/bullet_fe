

export const capitalizeString = (str) => {
	return str[0].toUpperCase() + str.substr(1, );
};


export const getCurrentDay = (year, month, day) => {
	const today = new Date()
	today.setHours(0,0,0,0);
	const date = new Date(year, month - 1, day);
	date.setHours(0,0,0,0);

	const isToday = today.getTime() === date.getTime();
	return isToday;
};


export const getCurrentMonth = () => {
    const today = new Date();
	return (today.getMonth() + 1)
};


export const getCurrentYear = () => {
    const today = new Date();
	return (today.getFullYear())
};


export const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate();
};