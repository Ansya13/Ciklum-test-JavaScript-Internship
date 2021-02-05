class Calendar {
    constructor(id) {
        this.calendar = document.getElementById(id);
        this.newEventBtn = this.calendar.querySelector(".header__btn");
        this.delDialogWindow = this.calendar.querySelector(".container__del-window");
        this.cancelBtn = this.calendar.querySelector(".submit__btn_no");
        this.submitBtn = this.calendar.querySelector(".submit__btn_yes");
        this.timeList = this.calendar.querySelector(".calendar__time-list");
        this.tasksList = this.calendar.querySelector(".calendar__tasks");
        this.filter = this.calendar.querySelector(".custom-select");

        this.createTimeBlock();
        this.init();
        this.createEvent();
        this.creatEvents();
    }

    init(){
        localStorage.setItem("data", JSON.stringify(data));
    }
    createTimeBlock() {
        let timeListHtml = "";
        timeList.forEach(currentTime => {
            timeListHtml += `<div class="calendar__time">${currentTime}</div>`
        });
        this.timeList.innerHTML = timeListHtml;
    }
    createEvent() {
        lsData = JSON.parse(localStorage.getItem("data"));
        let tasksList = "";
        lsData.forEach((currentTask, index) => {
            if (currentTask.availability) {
                tasksList += `<div class="task calendar__task" data-num="${index}"></div>`;
            } else {
                tasksList += `<div class="task task_set calendar__task container__flex" data-num="${index}">
				<h2 class="task__heading">${currentTask.title}</h2>
				<button type="button" class="del-btn task__del-btn">X</button>
				</div>`;
            }

        });
        this.tasksList.innerHTML = tasksList;
        this.dellEvent=this.calendar.querySelectorAll(".task__del-btn");
        this.dellEvent.forEach((currentDelBtn) => {
            currentDelBtn.onclick = this.openDialogDeleteEvent.bind(this);
        });
    }
    openWindow(event) {
        let newEvent = event.currentTarget;
        newEvent = window.open("window/create-meeting.html", "target", "width=700, height=525, left=0, bottom=0, right=0, top=0, location=no");
        let intervalId = setInterval(() => {
                if(newEvent.closed){
                    this.createEvent();
                    clearInterval(intervalId);
                }
        }, 2000);
    }

    sortEvent() {
        let filter = this.calendar.querySelector(".select-selected");
        let filterParticipant = filter.innerText;
        let filteredTask = "";
        if(filterParticipant == "All members"){
            this.createEvent();
        }
        else{
            lsData = JSON.parse(localStorage.getItem("data"));
            lsData.forEach((currentParticipants, index) => {
                if (currentParticipants.participants.includes(filterParticipant)) {
                    filteredTask += `<div class="task task_set calendar__task container__flex" data-num="${index}">
                 <h2 class="task__heading">${currentParticipants.title}</h2>
                 <button type="button" class="del-btn task__del-btn">X</button>
                 </div>`;
                 }
                 else {
                 filteredTask += `<div class="task calendar__task" data-num="${index}"></div>`;
                 }
        });
        this.tasksList.innerHTML = filteredTask;
        this.dellEvent = this.calendar.querySelectorAll(".task__del-btn");
        this.dellEvent.forEach((currentDelBtn) => {
            currentDelBtn.onclick = this.openDialogDeleteEvent.bind(this);
        });
        }
}
    openDialogDeleteEvent(event) {
        this.dellEvent = event.currentTarget;
        let indexData = this.dellEvent.parentNode.dataset.num;
        this.eventQuestion = this.calendar.querySelector(".event__question");
        this.eventQuestion.innerHTML = `${lsData[indexData].title}`;
        this.delDialogWindow.style.display = "block";
        this.submitBtn.onclick = () => {
            this.confirmDelEvent(indexData);
            }
        }

    confirmDelEvent(taskIndex) {
        lsData[taskIndex].title = "";
        lsData[taskIndex].participants = "";
        lsData[taskIndex].availability = true;
        this.delDialogWindow.style.display = "none";
        localStorage.setItem("data", JSON.stringify(lsData));
        this.sortEvent();
    }
    closeDialog(event) {
        this.cancelBtn = event.currentTarget;
        this.delDialogWindow.style.display = "none";
    }

    windowClose() {
        window.close()
    }

    creatEvents() {
        this.newEventBtn.onclick = this.openWindow.bind(this);
        this.cancelBtn.onclick = this.closeDialog.bind(this);
        this.filter.onclick = this.sortEvent.bind(this);
    }

}