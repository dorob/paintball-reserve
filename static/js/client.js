const reserveButton = $('#reserveButton');
const selectedDate = $('#dateButton');
const slotTimes = $('.slotTime').toArray();
let slotStatuses = $('.slotStatus').toArray();

$(selectedDate).html(new Date());

formatDate(new Date($(selectedDate).text()));

slotStatuses.forEach(function (slotStatusItem) {
    $(slotStatusItem).click(function () {
        if ($(slotStatusItem).text() == 'Szabad') {
            $(slotStatusItem).html('Kijelölve');
            $(slotStatusItem).removeClass("btn-success").addClass("btn-primary");
        }
        else if ($(slotStatusItem).text() == 'Kijelölve') {
            $(slotStatusItem).html('Szabad');
            $(slotStatusItem).removeClass("btn-primary").addClass("btn-success");
        }
    });
});

reserveButton.click(function () {
    const selectedMap = getClickedMap();
    const mapName = $(selectedMap).attr('name');
    sendReservation(mapName);
});

function getClickedMap() {
    const maps = $('.map').toArray();
    console.log(maps)
    const selectedMap = maps.filter(function (mapItem) {
        return $(mapItem).parents('.active').length > 0
    });
    return selectedMap
};


function getSlotStartTimeArray() {
    let slotStartTimeArray = [];
    slotTimes.forEach(function (slotTimeItem) {
        let startTimeString;
        if ($(slotTimeItem).text().length == 12) {
            startTimeString = $(slotTimeItem).text().substring(0, 1);
        }
        else {
            startTimeString = $(slotTimeItem).text().substring(0, 2);
        }
        const startTime = parseInt(startTimeString);
        slotStartTimeArray.push(startTime);
    });
    return slotStartTimeArray;
}


function getSlotEndTimeArray() {
    let slotEndTimeArray = [];
    slotTimes.forEach(function (slotTimeItem) {
        let endTimeString;
        if ($(slotTimeItem).text().length == 11) {
            endTimeString = $(slotTimeItem).text().substring(7, 8);
        }
        else if ($(slotTimeItem).text().length == 12) {
            endTimeString = $(slotTimeItem).text().substring(7, 9);
        }
        else {
            endTimeString = $(slotTimeItem).text().substring(8, 10);
        }
        const endTime = parseInt(endTimeString);
        slotEndTimeArray.push(endTime);
    });
    return slotEndTimeArray;
}

function getSlotStatusArray() {
    let slotStatusArray = [];
    slotStatuses.forEach(function (slotStatusItem) {
        const slotStatusText = $(slotStatusItem).text();
        slotStatusArray.push(slotStatusText);
    });
    return slotStatusArray;
}

function getDateObject() {
    const selectedDateText = $(selectedDate).text();
    const year = selectedDateText.substring(0, 4);
    const month = selectedDateText.substring(5, 7);
    const day = selectedDateText.substring(8, 10);

    const date = {
        year,
        month,
        day
    };

    return date;
}

function sendReservation(mapName) {
    $.ajax({
        method: "POST",
        url: "/reserve/add",
        data: {
            clientMapName: mapName,
            clientDate: getDateObject(),
            clientSlotStartTimes: getSlotStartTimeArray(),
            clientSlotEndTimes: getSlotEndTimeArray(),
            clientSlotStatuses: getSlotStatusArray()
        }
    })
};

function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
        month = '0' + month;
    let day = date.getDate();
    if (day < 10)
        day = '0' + day;

    $(selectedDate).html(year + "." + month + "." + day);
}

