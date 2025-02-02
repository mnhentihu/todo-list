function logout() {
  localStorage.removeItem("loggedInUser");
  window.location.href = "index.html";
}

const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

if (!loggedInUser) {
  window.location.href = "index.html";
}

const welcomeMessage = document.getElementById("welcome-message");
const userInfo = document.getElementById("user-info");

if (loggedInUser) {
  const fullName = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  const email = loggedInUser.email;
  const jabatan = loggedInUser.jabatan;

  welcomeMessage.textContent = `Welcome, ${fullName}!`;
  userInfo.innerHTML = `
          <span class="font-light text-xs sm:text-sm text-secondary">${email}</span> <br>
          <span class="font-semibold text-sm sm:text-base">${jabatan}</span>
      `;
}

function updateTime() {
  const dateAndDayElement = document.getElementById("date-and-day");
  const timeElement = document.getElementById("current-time");

  const now = new Date();

  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  const seconds = now.getSeconds().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}:${seconds}`;

  const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
  const months = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  const day = days[now.getDay()];
  const date = now.getDate();
  const month = months[now.getMonth()];
  const year = now.getFullYear();
  const formattedDateAndDay = `${day}, ${date} ${month} ${year}`;

  dateAndDayElement.textContent = formattedDateAndDay;
  timeElement.textContent = formattedTime;
}
setInterval(updateTime, 1000);
updateTime();
