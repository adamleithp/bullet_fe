

export const capitalizeString = (str) => {
	return str[0].toUpperCase() + str.substr(1, );
};


export const getCurrentDay = (year, month, day) => {
	const today = new Date()
	today.setHours(0,0,0,0);
	const date = new Date(year, month - 1, day);
	date.setHours(0,0,0,0);

	return today.getTime() === date.getTime();
};


export const isCurrentMonth = (year, month) => {
	const today = new Date()
	today.setHours(0,0,0,0);
	today.setDate(0);

	const date = new Date(year, month - 1);
	date.setHours(0,0,0,0);
	date.setDate(0);

	return today.getTime() === date.getTime();
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

