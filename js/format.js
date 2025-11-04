// ====== AUTO-FORMAT ANGKA DI TEXTBOX ======
document.addEventListener("input", function (e) {
  const target = e.target;
  if (target.tagName === "INPUT" && target.getAttribute("inputmode") === "numeric") {
    let value = target.value.replace(/\D/g, ""); // hapus semua non-digit
    if (value) {
      target.value = parseInt(value, 10).toLocaleString("id-ID"); // tambahkan titik ribuan
    } else {
      target.value = "";
    }
  }
});
