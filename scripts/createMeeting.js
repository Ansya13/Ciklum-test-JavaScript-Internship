class Meeting {
    constructor(id) {
        this.meeting = document.getElementById(id);
        this.formData = this.meeting.querySelector(".container");
        this.errorMassage = this.meeting.querySelector(".error-massage");
        this.cancelBtn = this.meeting.querySelector(".submit__btn_cancel");
        this.createBtn = this.meeting.querySelector(".submit__btn_create");

        this.creatEvents();
    }
    createMeeting() {
        console.log("ok");
        lsData = JSON.parse(localStorage.getItem("data"));
        const title = this.formData.querySelector(".name-event__text_name");
        const participant = this.formData.querySelector(".participants .multi__inner");
        const dayOfEvents = this.formData.querySelector(".day__custom-select .select-selected");
        const timeOfEvents = this.formData.querySelector(".time__custom-select .select-selected");

        let selectedDayIndex = 0;
        let selectedDayData = lsData.filter((currentDayData, index) => {
            if (currentDayData.day == dayOfEvents.innerText && currentDayData.time == timeOfEvents.innerText && currentDayData.availability) {
                selectedDayIndex = index;
                return true;
            } else {
                return false;
            }

        });

        if (selectedDayData.length) {
            lsData = JSON.parse(localStorage.getItem("data"));
            this.errorMassage.style.display = "none";
            lsData[selectedDayIndex].title = title.value;
            lsData[selectedDayIndex].participants = participant.innerText.replace(/\n/gm, "").split(",");
            lsData[selectedDayIndex].availability = false;
            localStorage.setItem("data", JSON.stringify(lsData));
            this.windowClose();
        } else {
            this.errorMassage.style.display = "flex";
        }
    }
    windowClose() {
        window.close();
    }

    creatEvents() {
        this.createBtn.onclick = this.createMeeting.bind(this);
        this.cancelBtn.onclick = this.windowClose.bind(this);

    };
}
let meeting = new Meeting("create-meeting");