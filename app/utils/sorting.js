export const defaultSort = (array, sortField, sortDirection) =>
    array.sort((a, b) => {
        let x = (a[sortField]);
        let y = (b[sortField]);
        
        if(sortField === "ended") {
            x = a.start_time + a.duration;
            y = b.start_time + b.duration
        } else if (sortField === "kda") {
            x = (a.kills + a.assists) / (a.deaths);
            y = (b.kills + b.assists) / (b.deaths);
        }

        const desc = x < y ? 1 : -1;
        const asc = x < y ? -1 : 1;
        return sortDirection === "desc" ? desc : asc;
    });

export const SORT_ENUM = {
    0: "asc",
    1: "desc",
    asc: 0,
    desc: 1,
    next: state => SORT_ENUM[(state >= 1 ? 0 : state + 1)],
};
