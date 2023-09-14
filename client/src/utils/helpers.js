const local = "http://localhost:3001";
const prod = "DOMAIN HERE";

export const BACKEND_HOST = local

export const units = [
    {
        value: "EA",
        name: "EA"
    },
    {
        value: "OZ",
        name: "OZ"
    },
    {
        value: "LB",
        name: "LB"
    },
    {
        value: "PT",
        name: "PT"
    },
    {
        value: "GAL",
        name: "GAL",
    },   
     {
        value: "QT",
        name: "QT"
    },
    {
        value: "SIDE",
        name: "SIDE",
    },

    {
        value: "PACK",
        name: "PACK"
    },
    {
        value: "DZ",
        name: "DZ"
    },
    {
        value: "HLF DZ",
        name: "HLF DZ"
    },
    // {
    //     value: "TRAY",
    //     name: "TRAY"
    // },
    // {
    //     value: "HALF TRAY",
    //     name: "HALF TRAY"
    // },
]

export function formatOrderTime(orderTime) {
    const year = orderTime.slice(0, 4);
    const month = orderTime.slice(4, 6);
    const day = orderTime.slice(6, 8);
    const hour = orderTime.slice(9, 11);
    const minute = orderTime.slice(12, 14);
    const date = new Date(year, month - 1, day, hour, minute);
    const formattedDate = `${(month < 10 ? '' : '') + month}/${(day < 10 ? '0' : '') + day}/${year} at ${(date.getHours() % 12 || 12)}:${(minute < 10 ? '0' : '') + minute} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
    return formattedDate;
  }