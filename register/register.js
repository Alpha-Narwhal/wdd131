let participantCount = 1;

const addBtn = document.getElementById("add");
const participantsFieldset = document.querySelector("fieldset.participants");
const form = document.getElementById("registrationForm");
const summary = document.getElementById("summary");

function participantTemplate(count) {
  return `
  <section class="participant participant${count}">
    <p>Participant ${count}</p>
    <div class="item">
      <label for="fname${count}">First Name<span>*</span></label>
      <input id="fname${count}" type="text" name="fname${count}" required />
    </div>
    <div class="item activities">
      <label for="activity${count}">Activity #<span>*</span></label>
      <input id="activity${count}" type="text" name="activity${count}" />
    </div>
    <div class="item">
      <label for="fee${count}">Fee ($)<span>*</span></label>
      <input id="fee${count}" type="number" name="fee${count}" min="0" />
    </div>
    <div class="item">
      <label for="date${count}">Desired Date <span>*</span></label>
      <input id="date${count}" type="date" name="date${count}" />
    </div>
    <div class="item">
      <p>Grade</p>
      <select id="grade${count}" name="grade${count}">
        <option value="" disabled selected></option>
        <option value="1">1st</option>
        <option value="2">2nd</option>
        <option value="3">3rd</option>
        <option value="4">4th</option>
        <option value="5">5th</option>
        <option value="6">6th</option>
        <option value="7">7th</option>
        <option value="8">8th</option>
        <option value="9">9th</option>
        <option value="10">10th</option>
        <option value="11">11th</option>
        <option value="12">12th</option>
      </select>
    </div>
  </section>`;
}

addBtn.addEventListener("click", () => {
  participantCount++;
  const html = participantTemplate(participantCount);
  addBtn.insertAdjacentHTML("beforebegin", html);
});

function totalFees() {
  let feeElements = document.querySelectorAll("[id^=fee]");
  feeElements = [...feeElements];
  const total = feeElements.reduce((acc, feeEl) => {
    const val = parseFloat(feeEl.value);
    return acc + (isNaN(val) ? 0 : val);
  }, 0);
  return total.toFixed(2);
}

function successTemplate(info) {
  return `
    <p>Thank you ${info.adultName} for registering. You have registered ${info.participants} participant${info.participants > 1 ? "s" : ""} and owe $${info.totalFees} in Fees.</p>
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const adultName = form.adult_name.value.trim();
  if (!adultName) {
    alert("Please enter the adult primary contact name.");
    return;
  }

  const total = totalFees();

  form.style.display = "none";
  summary.style.display = "block";
  summary.innerHTML = successTemplate({
    adultName,
    participants: participantCount,
    totalFees: total,
  });
});
