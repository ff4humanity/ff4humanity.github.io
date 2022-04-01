window.addEventListener("load", () => {
  let page = location.href.indexOf("/xck.html") != -1 ? 1 : 0;
  try {
    window.top.setTitle(page ? "通信大数据行程卡" : "苏康码");
  } catch (e) {}

  if (page) {
    document.querySelector("#update-time").innerHTML = format2();
  } else {
    // text length: 160-180
    var o = "https://h5.dingtalk.com/healthAct/index.html?qrCode=".padEnd(
      170,
      encodeURIComponent("Liberate Hong Kong, the revolution of our times")
    );
    $("#output").qrcode({
      render: "canvas",
      text: o,
      width: "230",
      height: "230",
      foreground: "green",
    });

    $("#now-time").html(format(new Date()));
    document.querySelector("#now-time").classList.remove("hidden");
    setInterval(function () {
      $("#now-time").html(format(new Date()));
    }, 500);

    document.querySelector("#xingchengBtn").addEventListener("click", () => {
      window.location.href = "xck.html";
    });
  }
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

function format2(a) {
  a = a || getBeijingTime();
  let yyyy = a.getFullYear(),
    MM = (a.getMonth() + 1).toString().padStart(2, "0"),
    dd = a.getDate().toString().padStart(2, "0"),
    hh = a.getHours().toString().padStart(2, "0"),
    mm = a.getMinutes().toString().padStart(2, "0"),
    ss = a.getSeconds().toString().padStart(2, "0");
  return `${yyyy}.${MM}.${dd} ${hh}:${mm}:${ss}`;
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
  let code1 = code.length >= 6 ? code.slice(0, 3) : "320";
  let code2 = code.length >= 3 ? code.slice(-3) : "042";
  document.querySelector("#code-name").innerHTML = name;
  document.querySelector("#code1").innerHTML = code1;
  document.querySelector("#code2").innerHTML = code2;
}

function setXc() {
  document.querySelector(".gwyxckcx").addEventListener("dblclick", (e) => {
    e.stopPropagation();
    let xc = (parseInt(localStorage.getItem("xc") || 0) + 1) % 3;
    localStorage.setItem("xc", xc);
    displayXc();
  });
  displayXc();
}

function displayXc() {
  let xc = parseInt(localStorage.getItem("xc") || 0);
  document.querySelector(".gwyxckcx").classList.remove("xc-0", "xc-1", "xc-2");
  document.querySelector(".gwyxckcx").classList.add("xc-" + xc);
}

function setArea() {
  document.querySelector("#area").addEventListener("dblclick", (e) => {
    e.stopPropagation();
    let area = prompt("更改区域为：", localStorage.getItem("area") || "");
    if (area != null && area != localStorage.getItem("area")) {
      localStorage.setItem("area", area);
      displayArea();
    }
  });
  displayArea();
}

function displayArea() {
  let area = localStorage.getItem("area") || "江苏省南京市";
  let xc = parseInt(localStorage.getItem("xc") || 0);
  document.querySelector("#area").innerHTML =
    xc != 2
      ? area
      : `${area}*（注：*表示当前该城市存在中风险或高风险地区，并不表示用户实际到访过这些中高风险地区。）`;
}

function setPhone() {
  document.querySelector("#phone").addEventListener("dblclick", (e) => {
    e.stopPropagation();
    let phone = prompt("更改手机号为：", localStorage.getItem("phone") || "");
    if (phone != null && phone != localStorage.getItem("phone")) {
      localStorage.setItem("phone", phone);
      displayPhone();
    }
  });
  displayPhone();
}

function displayPhone() {
  let phone = localStorage.getItem("phone") || "15000000042";
  document.querySelector("#phone").innerHTML = `${phone.slice(
    0,
    3
  )}****${phone.slice(-4)}`;
}
