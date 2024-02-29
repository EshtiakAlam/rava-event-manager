
const formatDate = (dateString) => {
    const date = new Date(dateString);

    // Create an array of month names
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    // Get the day, month, and year
    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    // Add suffix to day (e.g., "1st", "2nd", "3rd", "4th", etc.)
    const suffixes = ["th", "st", "nd", "rd"];
    const suffix = day % 10 < 4 ? suffixes[day % 10] : suffixes[0];
    const formattedDay = day + suffix;

    return `${formattedDay} ${month} ${year}`;
};


export default formatDate