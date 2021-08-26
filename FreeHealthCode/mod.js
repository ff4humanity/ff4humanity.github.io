window.addEventListener("load", () => {
  var o = "https://h5.dingtalk.com/healthAct/index.html?qrCode=fuckyou";
  $("#output").qrcode({
    render: "canvas",
    text: o,
    width: "230",
    height: "230",
    foreground: "green"
  });

  setInterval(function () {
    $("#now-time").html(format(new Date()));
  }, 500);
});

function getBeijingTime() {
  // create Date object for current location
  var d = new Date();
  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  // get utc+8 time
  return new Date(utc + 3600000 * 8);
}

function format(e) {
  var a = getBeijingTime();
  (r = (a.getFullYear(), a.getMonth() + 1)),
    (d = a.getDate()),
    (o = a.getHours()),
    (t = a.getMinutes()),
    (i = a.getSeconds());
  return (
    r.toString().padStart(2, "0") +
    "-" +
    d.toString().padStart(2, "0") +
    " " +
    o.toString().padStart(2, "0") +
    ":" +
    t.toString().padStart(2, "0") +
    ":" +
    i.toString().padStart(2, "0")
  );
}

function setPersonalInfo() {
  let name = localStorage.getItem("name");
  let code = localStorage.getItem("code");

  let search = location.search;
  try {
    if (window.top !== window) {
      search = window.top.location.search;
    }
  } catch (e) {}
  let searchParams = new URLSearchParams(search);
  let queryName = searchParams.get("name");
  let queryCode = searchParams.get("code");

  if (queryName && queryName !== name) {
    localStorage.setItem("name", queryName);
    name = queryName;
  }
  if (queryCode && queryCode !== code) {
    localStorage.setItem("code", queryCode);
    code = queryCode;
  }
  displayPersonalInfo(name, code);

  document.querySelector("#code-name").addEventListener("dblclick", (e) => {
    e.stopPropagation();
    name = prompt("更改姓名为：", name || "");
    if (name !== null) {
      localStorage.setItem("name", name);
      displayPersonalInfo(name, code);
    }
  });
  document.querySelector("#code-id").addEventListener("dblclick", (e) => {
    e.stopPropagation();
    code = prompt("更改 id 为：", code || "");
    if (code !== null) {
      localStorage.setItem("code", code);
      displayPersonalInfo(name, code);
    }
  });
}

function displayPersonalInfo(name, code) {
  name = name || "刘洋";
  code = code || "";
  let code1 = code.length >= 5 ? code.slice(0, 2) : "32";
  let code2 = code.length >= 3 ? code.slice(-3) : "042";
  document.querySelector("#code-name").innerHTML = name;
  document.querySelector("#code1").innerHTML = code1;
  document.querySelector("#code2").innerHTML = code2;
}
