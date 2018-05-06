const reserveButton = $('#reserveButton');
const selectedDate = $('#dateButton');
const maps = $('.map').toArray();
const slotTimes = $('.slotTime').toArray();
let slotStatuses = $('.slotStatus').toArray();
let selectedMap;

$(selectedDate).html(new Date());

formatDate(new Date($(selectedDate).text()));

slotStatuses.forEach(function(slotStatusItem) {
    $(slotStatusItem).click(function(){
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

reserveButton.click(function(){
    getClickedMap(maps);
    sendReservation();
});

function getClickedMap(maps) {
    maps.forEach(function(mapItem) {
        if ($(mapItem).hasClass("active"))
            selectedMap = mapItem;
    });
};

/*
function getSlotStartTimeArray() {
    let slotStartTimeArray = [];
    slotTimes.forEach(function (slotTimeItem) {
        if ($(slotTimeItem).text().length == 12)
            $(slotTimeItem).text().substring(0,2).
    })
}
*/

function sendReservation(){
    $.ajax({
    method: "POST",
    url: "/reserve/add",
    data: { 
        mapName: $(selectedMap).text(),
        date: $(selectedDate).text(),
        slotTime: $(slotTimes),
        slotStatus: slotStatuses
        }
    })
};

function formatDate(date) {
    console.log("formatdayben");
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10)
        month = '0' + month;
    let day = date.getDate();
    if (day < 10)
        day = '0' + day;

    $(selectedDate).html(year+"."+month+"."+day);
}

