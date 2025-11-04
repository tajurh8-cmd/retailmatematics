document.addEventListener("input", function (e) {
  const target = e.target;
  if (target.tagName === "INPUT" && target.getAttribute("inputmode") === "numeric") {
    const start = target.selectionStart;
    let value = target.value.replace(/\D/g, "");
    if (value) {
      target.value = Number(value).toLocaleString("id-ID");
    } else {
      target.value = "";
    }
    target.setSelectionRange(start, start); // jaga posisi kursor
  }
});
