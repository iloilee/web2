// ====================Tải header và footer khi trang được tải lần đầu==================
document.addEventListener("DOMContentLoaded", function () {
  // Tải header
  fetch("header.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("header").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading header:", error);
    });

  // Tải footer
  fetch("footer.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("footer").innerHTML = data;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
    });
});

// ==================================khung hinh chuyen dong=======================
let i = 0;
const images = document.querySelectorAll(".slideshow img"); //mảng
const dodaimang = images.length;

function hienthihinh() {
  images[i].classList.remove("active"); // xóa active
  i = (i + 1) % dodaimang; // quay lại hình 1
  images[i].classList.add("active"); // thêm active
}

setInterval(hienthihinh, 2500);
// =============================Hàm để tải nội dung mới mà không làm mới trang
function loadPage(page) {
  // Tải nội dung phần header và footer
  document.getElementById("header").innerHTML = "";
  document.getElementById("footer").innerHTML = "";

  // Tải nội dung của trang hiện tại vào phần main
  fetch(page)
    .then((response) => response.text())
    .then((data) => {
      // Xử lý dữ liệu tải về và chèn nội dung vào body
      let parser = new DOMParser();
      let doc = parser.parseFromString(data, "text/html");

      // Tải lại phần header và footer
      document.getElementById("header").innerHTML =
        doc.querySelector("header").innerHTML;
      document.getElementById("footer").innerHTML =
        doc.querySelector("footer").innerHTML;

      // Chèn nội dung phần main
      document.querySelector("main").innerHTML =
        doc.querySelector("main").innerHTML;
    })
    .catch((error) => console.error("Error loading page:", error));
}
