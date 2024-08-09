export const convertTimeTo12Hour = (time) => {
    const [hour, minute] = time.split(':');
    const period = +hour >= 12 ? 'PM' : 'AM';
    const hour12 = +hour % 12 || 12;
    return `${hour12}:${minute}${period}`;
};

export const formatDate = (taskDate) => {
    const today = new Date();
    const date = new Date(taskDate);
    const differenceInDays = Math.floor((date - today) / (1000 * 60 * 60 * 24));
    const currentYear = today.getFullYear();
    const taskYear = date.getFullYear();
    const options = {
        month: 'short',
        day: 'numeric',
        ...(taskYear !== currentYear && { year: 'numeric' })
    };

    if (differenceInDays === 0) {
        return 'Today';
    } else if (differenceInDays > 0 && differenceInDays <= 6) {
        return date.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
        return date.toLocaleDateString('en-US', options);
    }
};


export const getTodaysDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

export const getDateOneYearFromNow = () => {
    const today = new Date();
    const nextYear = new Date(today.setFullYear(today.getFullYear() + 1));
    const year = nextYear.getFullYear();
    const month = String(nextYear.getMonth() + 1).padStart(2, '0');
    const day = String(nextYear.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};