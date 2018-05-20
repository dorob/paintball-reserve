const reserveButton = $('#reserveButton');
const modifyButton = $('#modifyReserveButton');
const loginButton = $('#loginButton');
const selectedDate = $('#datepicker');
const slotTimes = $('.slotTime').toArray();
const slotStatuses = $('.slotStatus').toArray();
const choosenMap = $('.btn.btn-secondary');

if ($('#datepicker').length > 0) {
    $('#datepicker').datepicker({
        todayHighlight: true,
    }).on('changeDate', function (e) {
        const choosenDate = e.date;
        const year = choosenDate.getFullYear();
        const month = choosenDate.getMonth() + 1;
        const day = choosenDate.getDate();
        window.location.replace('/reserve/add/' + year + '-' + month + '-' + day);
    });
}

choosenMap.click(function () {
    const map = $(this).children();
    const mapName = map.attr('name');
    const path = window.location.pathname;
    window.location.replace(path + '?map=' + mapName);
});

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

modifyButton.click(function () {
    const urlElements = window.location.pathname.split('/');
    const reservationId = urlElements[urlElements.length - 1];
    modifyReservation(reservationId);
});

reserveButton.click(function () {
    const selectedMap = getClickedMap();
    const mapName = $(selectedMap).attr('name');
    if (!mapName) return alert('A fogadás leadásához ki kell választanod egy pályát!');
    sendReservation(mapName);
});

loginButton.click(function () {

})

function getClickedMap() {
    const maps = $('.map').toArray();
    const selectedMap = maps.filter(function (mapItem) {
        return $(mapItem).parents('.active').length > 0;
    });
    return selectedMap;
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
    const choosenDate = new Date(selectedDateText);
    const year = choosenDate.getFullYear();
    const month = choosenDate.getMonth() + 1;
    const day = choosenDate.getDate();

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
    }).done(function () {
        window.location.replace('/');
    }).fail(function (error) {
        console.log(error)
    });
}

function modifyReservation(reservationId) {
    $.ajax({
        method: "POST",
        url: "/reserve/mod/" + reservationId,
        data: {
            clientSlotStartTimes: getSlotStartTimeArray(),
            clientSlotEndTimes: getSlotEndTimeArray(),
            clientSlotStatuses: getSlotStatusArray()
        }
    }).done(function () {
        window.location.replace('/reservations');
    }).fail(function (error) {
        console.log(error)
    });
}
