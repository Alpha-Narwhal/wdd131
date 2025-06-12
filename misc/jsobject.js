const aCourse = {
  code: "CSE121b",
  name: "Javascript Language",
  sections: [
    {
      sectionNum: 1,
      roomNum: "STC 353",
      enrolled: 26,
      days: "TTh",
      instructor: "Bro T",
    },
    {
      sectionNum: 2,
      roomNum: "STC 347",
      enrolled: 25,
      days: "TTh",
      instructor: "Sis A",
    },
  ],

  setCourseInfo() {
    document.querySelector("#courseName").textContent = this.name;
    document.querySelector("#courseCode").textContent = this.code;
  },

  renderSections() {
    const sectionTemplate = (section) => `
      <tr>
        <td>${section.sectionNum}</td>
        <td>${section.roomNum}</td>
        <td>${section.enrolled}</td>
        <td>${section.days}</td>
        <td>${section.instructor}</td>
      </tr>`;

    const html = this.sections.map(sectionTemplate).join("");
    document.querySelector("#sections").innerHTML = html;
  },

  changeEnrollment(sectionNum, add = true) {
    sectionNum = Number(sectionNum);
    const idx = this.sections.findIndex(s => s.sectionNum === sectionNum);
    if (idx >= 0) {
      if (add) {
        this.sections[idx].enrolled++;
      } else if (this.sections[idx].enrolled > 0) {
        this.sections[idx].enrolled--;
      } else {
        alert(`No students to drop in section ${sectionNum}`);
        return;
      }
      this.renderSections();
    } else {
      alert(`Section ${sectionNum} not found!`);
    }
  },

  setupEventListeners() {
    document.querySelector("#enrollStudent").addEventListener("click", () => {
      const sectionNum = document.querySelector("#sectionNumber").value;
      this.changeEnrollment(sectionNum, true);
    });

    document.querySelector("#dropStudent").addEventListener("click", () => {
      const sectionNum = document.querySelector("#sectionNumber").value;
      this.changeEnrollment(sectionNum, false);
    });
  },
};

aCourse.setCourseInfo();
aCourse.renderSections();
aCourse.setupEventListeners();
