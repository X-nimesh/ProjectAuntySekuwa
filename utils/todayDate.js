export const todayDate = () => {
    let date = new Date();
    let today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    return today;
}
