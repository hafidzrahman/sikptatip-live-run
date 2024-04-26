export function deadline(date) {
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu'];

    const present = new Date();
    const deadline = new Date(date);
    const stringDate = days[deadline.getDay()] + ", " + deadline.toLocaleString('ID', {
        day : 'numeric',
        month : 'long',
        year: 'numeric'
    })

    if (expiredChecker(date)) {
        return {
            stringDate,
            day : 0
        }
    }

    const countDown = {}

        let time = deadline.getFullYear() - present.getFullYear();
        countDown.year = time;
    
        time = deadline.getMonth() - present.getMonth();
        if (time < 0) {
            countDown.year = countDown.year - 1;
            countDown.month = 12 + deadline.getMonth() - present.getMonth();
        } else {
            countDown.month = time;
        }

        countDown.day = 0;

        if (present.getDate() !== 31) {
        for (let i = present.getDate() + 1; i < 32; i++) {
            let monthTemp = present.getMonth() + 1;
            const temp = new Date(`${present.getFullYear()}-${monthTemp}-${i}`);
            countDown.day = countDown.day + 1;
            if (temp.getDate() === 1 && i !== 1) {
                countDown.day = countDown.day - 1;
                break;
            } else if (((deadline.getMonth() + 1) === monthTemp) && deadline.getDate() === i) {
                break
            }
        }
        }

        let plusYear = 0;
        let monthTemp = present.getMonth() + 2;
        for (let i = 1; i <= countDown.month; i++) {
            if (monthTemp > 12) {
                ++plusYear;
                monthTemp = 1;
            };
            for (let j = 1; j < 32; j++) {
                const temp1 = new Date(`${present.getFullYear() + plusYear}-${monthTemp}-${j}`);
                countDown.day = countDown.day + 1;
                if (temp1.getDate() === 1 && j !== 1) {
                countDown.day = countDown.day - 1;
                break;
            } else if (((deadline.getMonth() + 1) === monthTemp) && deadline.getDate() === j) {
                break
            }
            }
            ++monthTemp;
        }
    
    
        return ({
            stringDate,
            day : countDown.day
        })
    

}

export function dateWithClock(sendedDate) {
    const {date, time} = sendedDate;
    const result = new Date(date).toLocaleString('ID', {
        day : 'numeric',
        month : 'long',
        year : 'numeric'
    }) + " - " + time.hour + "." + time.minute + " WIB";
    
    return result
}

export function expiredChecker(sendedDeadline) {
    const present = new Date();
    const deadline = new Date(sendedDeadline);
    return (deadline-present < 0);
}