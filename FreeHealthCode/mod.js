const pages = {
  "unit.html": { title: "场所码", type: 2 },
  "qr.html": { title: "扫码", type: 3 },
  "hs.html": { title: "苏康码", type: 4 },
  default: { title: "苏康码", type: 0 },
};
const DEFAULT_AREA = "江苏省南京市";
const USE_HASH = !!getHashParams("hash");

document.body.classList.add("hs-0", "ym-0");

window.addEventListener("load", () => {
  let page =
    pages[location.pathname.slice(location.pathname.lastIndexOf("/") + 1)] ||
    pages.default;
  try {
    window.top.setTitle(page.title);
  } catch (e) {}

  if (page.type == 1) {
    document.querySelector("#update-time").innerHTML = format2();
  } else if (page.type == 3) {
    qr();
  } else if (page.type == 4) {
    document.querySelector("#return-btn").addEventListener("click", () => {
      window.location.href = "main.html";
    });
  } else if (page.type == 0) {
    displayHcode();
    document.querySelector("#output").addEventListener("dblclick", (e) => {
      let hcode = prompt(
        "手工设置健康码二维码文字内容:",
        getState("hcode") || ""
      );
      if (hcode == null) {
        return;
      }
      setState("hcode", hcode);
      displayHcode();
    });

    $("#now-time").html(format(new Date()));
    document.querySelector("#now-time").classList.remove("hidden");
    setInterval(function () {
      $("#now-time").html(format(new Date()));
    }, 500);

    function toggleHs() {
      document
        .querySelector("#slider-sz")
        .classList.remove("stop-center", "stop-right");
      document.querySelector("#slider-sz").classList.add("stop-left");
    }
    document
      .querySelector(".hs-layout .hsym-footer")
      .addEventListener("click", toggleHs);
    document
      .querySelector(".hs-layout .hsym-footer")
      .addEventListener("touchend", toggleHs);

    Array.from(document.querySelectorAll(".hs-goback .slider-btn")).forEach(
      (el) => {
        el.addEventListener("click", () => {
          document
            .querySelector("#slider-sz")
            .classList.remove("stop-left", "stop-right");
          document.querySelector("#slider-sz").classList.add("stop-center");
        });
      }
    );
    Array.from(document.querySelectorAll("#hsjcJSBtn, #hsjcBtn")).forEach(
      (el) => {
        el.addEventListener("click", (el) => {
          window.location.href = "hs.html";
        });
      }
    );

    setPhone();
    setPersonalInfo();
    setHstatus();
    setYm();
    setXc();
    displayLatestHs();
  }
});

function getBeijingTime(offset = 0) {
  // create Date object for current location
  var d = new Date();
  // convert to msec
  // subtract local time zone offset
  // get UTC time in msec
  var utc = d.getTime() + d.getTimezoneOffset() * 60000;
  // get utc+8 time
  return new Date(utc + 3600000 * 8 + offset);
}

function format(a) {
  a = a || getBeijingTime();
  let MM = (a.getMonth() + 1).toString().padStart(2, "0"),
    dd = a.getDate().toString().padStart(2, "0"),
    hh = a.getHours().toString().padStart(2, "0"),
    mm = a.getMinutes().toString().padStart(2, "0"),
    ss = a.getSeconds().toString().padStart(2, "0");
  return `${MM}-${dd} ${hh}:${mm}:${ss}`;
}

function formatTime(a) {
  a = a || getBeijingTime();
  let yyyy = a.getFullYear(),
    MM = (a.getMonth() + 1).toString().padStart(2, "0"),
    dd = a.getDate().toString().padStart(2, "0"),
    hh = a.getHours().toString().padStart(2, "0"),
    mm = a.getMinutes().toString().padStart(2, "0"),
    ss = a.getSeconds().toString().padStart(2, "0");
  return `${yyyy}-${MM}-${dd} ${hh}:${mm}:${ss}`;
}

function formatDate(a) {
  a = a || getBeijingTime();
  let yyyy = a.getFullYear(),
    MM = (a.getMonth() + 1).toString().padStart(2, "0"),
    dd = a.getDate().toString().padStart(2, "0");
  return `${yyyy}-${MM}-${dd}`;
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
  let name = getState("name");
  let code = getState("code");

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
    setState("name", queryName);
    name = queryName;
  }
  if (queryCode && queryCode !== code) {
    setState("code", queryCode);
    code = queryCode;
  }
  displayPersonalInfo(name, code);

  document
    .querySelector('*[data-fhcvalue="name"]')
    .addEventListener("dblclick", (e) => {
      e.stopPropagation();
      name = prompt("更改姓名为：", name || "");
      if (name !== null) {
        setState("name", name);
        displayPersonalInfo(name, code);
      }
    });
  document
    .querySelector('*[data-fhcvalue="code"]')
    .addEventListener("dblclick", (e) => {
      e.stopPropagation();
      code = prompt("更改 id 为：", code || "");
      if (code !== null) {
        setState("code", code);
        displayPersonalInfo(name, code);
      }
    });
}

function displayHcode() {
  // text length: 160-180
  var o =
    getState("hcode") ||
    `https://h5.dingtalk.com/healthAct/index.html?qrCode=V${randomStr(
      39,
      1
    )}&b=u${randomStr(4, 1)}${randomStr(2)}%2B${randomStr(29)}%2B${randomStr(
      26
    )}#/result`;
  document.querySelector("#output").innerHTML = "";
  $("#output").qrcode({
    render: "canvas",
    text: o,
    width: "230",
    height: "230",
    foreground: "green",
  });
}

function displayPersonalInfo(name, code) {
  name = name || "刘洋";
  code = code || "";
  let code1 = code.length >= 6 ? code.slice(0, 3) : "320";
  let code2 = code.length >= 3 ? code.slice(-3) : "042";
  document.querySelector('*[data-fhcvalue="name"]').innerHTML = name;
  document.querySelector(
    '*[data-fhcvalue="code"]'
  ).innerHTML = `${code1}******${code2}`;
}

function setXc() {
  let xcEl = document.querySelector('*[data-fhcvalue="xcstatus"]');
  if (xcEl) {
    xcEl.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      let xc = (parseInt(getState("xc") || 0) + 1) % 3;
      setState("xc", xc);
      displayXc();
    });
    displayXc();
  }
}

function displayXc() {
  let xc = parseInt(getState("xc") || 0);
  document.body.classList.remove("xc-0", "xc-1", "xc-2");
  document.body.classList.add("xc-" + xc);
}

function setArea() {
  document.querySelector("#area").addEventListener("dblclick", (e) => {
    e.stopPropagation();
    let area = prompt("更改区域为：", getState("area") || DEFAULT_AREA);
    if (area != null && area != getState("area")) {
      setState("area", area);
      displayArea();
    }
  });
  displayArea();
}

function displayArea() {
  let area = getState("area") || DEFAULT_AREA;
  document.querySelector("#area").innerHTML = area;
}

function setPhone() {
  document
    .querySelector('*[data-fhcvalue="phone"]')
    .addEventListener("dblclick", (e) => {
      e.stopPropagation();
      let phone = prompt("更改手机号为：", getState("phone") || "");
      if (phone != null && phone != getState("phone")) {
        setState("phone", phone);
        displayPhone();
      }
    });
  displayPhone();
}

function displayPhone() {
  let phone = getState("phone") || "15000000042";
  document.querySelector('*[data-fhcvalue="phone"]').innerHTML = `${phone.slice(
    0,
    3
  )}****${phone.slice(-4)}`;
}

function setUnit() {
  displayUnit();
  var items = [
    {
      name: "删除当前场所",
      fn: deleteUnit,
    },
    {
      name: "删除所有场所",
      fn: deleteAllUnits,
    },
    {
      name: "新增场所",
      fn: addUnit,
    },
  ];
  var menu = new ContextMenu(".address", items);
  document.querySelector(".address").addEventListener("dblclick", toggleUnit);
}

function displayUnit() {
  document.querySelector("#unitName").innerHTML = getState("unitName") || "";
  document.querySelector("#unitAddress").innerHTML =
    getState("unitAddress") || "";
}

function deleteAllUnits() {
  if (!confirm("确认删除所有场所？")) {
    return;
  }
  setState("unitName", "");
  setState("unitAddress", "");
  setState("units", "[]");
  displayUnit();
}

function deleteUnit() {
  let unitName = getState("unitName") || "";
  let unitAddress = getState("unitAddress") || "";
  if (!unitName) {
    return;
  }
  if (!confirm(`删除当前场所 ${unitName} ？`)) {
    return;
  }
  let units = getUnits();
  try {
    let index = units.findIndex((unit) => unit.startsWith(unitName + "|"));
    if (index == -1) {
      return;
    }
    units.splice(index, 1);
    setState("units", JSON.stringify(units));
    let unit =
      units.length > 0
        ? index < units.length
          ? units[index]
          : units[0]
        : null;
    if (unit) {
      [unitName, unitAddress] = unit.split("|");
    } else {
      unitName = unitAddress = "";
    }
    setState("unitName", unitName);
    setState("unitAddress", unitAddress);
    displayUnit();
  } catch (e) {}
}

function addUnit() {
  let unitInfo = prompt(`请输入场所的名称和地址(使用 "," 或 "|" 分割)`, "");
  if (!unitInfo) {
    return;
  }
  let [unitName, unitAddress] = unitInfo.split(/\s*[,，|]\s*/);
  if (!unitAddress) {
    let index = unitInfo.lastIndexOf("江苏");
    if (index == -1) {
      index = unitInfo.lastIndexOf("南京");
    }
    if (index > 0) {
      unitName = unitInfo.slice(0, index);
      unitAddress = unitInfo.slice(index);
    }
  }
  unitName = unitName.trim();
  unitAddress = unitAddress.trim();
  if (!unitName || !unitAddress) {
    return;
  }
  let units = getUnits();
  try {
    units.push(unitName + "|" + unitAddress);
    setState("unitName", unitName);
    setState("unitAddress", unitAddress);
    setState("units", JSON.stringify(units));
    displayUnit();
  } catch (e) {}
}

function toggleUnit() {
  let unitName = getState("unitName") || "";
  let unitAddress = getState("unitAddress") || "";
  let units = getUnits();
  try {
    let index = unitName
      ? units.findIndex((unit) => unit.startsWith(unitName + "|"))
      : -1;
    if (index != -1) {
      index = (index + 1) % units.length;
    } else if (units.length) {
      index = 0;
    }
    if (index != -1) {
      [unitName, unitAddress] = units[index].split("|");
    } else {
      unitName = unitAddress = "";
    }
    setState("unitName", unitName);
    setState("unitAddress", unitAddress);
    displayUnit();
  } catch (e) {}
}

function getUnits() {
  let units = [];
  try {
    units = JSON.parse(getState("units"));
    if (!Array.isArray(units)) {
      units = [];
    }
  } catch (e) {}
  return units;
}

async function qr() {
  const video = document.querySelector("video");

  const constraints = {
    video: {
      facingMode: "environment",
    },
    audio: false,
  };
  const stream = await navigator.mediaDevices.getUserMedia(constraints);
  video.srcObject = stream;
  await sleep(1000);
  location.href = "unit.html";
}

function sleep(miliseconds) {
  return new Promise((resolve) => setTimeout(resolve, miliseconds));
}

function setYm() {
  let ymEl = document.querySelector('*[data-fhcvalue="ym"]');
  if (ymEl) {
    ymEl.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      let ym = (parseInt(getState("ym") ?? 1) + 1) % 2;
      setState("ym", ym);
      displayYm();
    });
    displayYm();
  }
}

function setHstatus() {
  let hstatusEl = document.querySelector('*[data-fhcvalue="hstatus"]');
  if (hstatusEl) {
    hstatusEl.addEventListener("dblclick", (e) => {
      e.stopPropagation();
      let hstatus = (parseInt(getState("hstatus") ?? 1) + 1) % 2;
      setState("hstatus", hstatus);
      displayHstatus();
    });
    displayHstatus();
  }
}

function displayYm() {
  let ym = parseInt(getState("ym") ?? 1);
  document.body.classList.remove("ym-0", "ym-1");
  document.body.classList.add("ym-" + ym);
}

function displayHstatus() {
  let hstatus = parseInt(getState("hstatus") ?? 1);
  document.body.classList.remove("hs-0", "hs-1");
  document.body.classList.add("hs-" + hstatus);
}

function displayHsBasicInfo() {
  let name = getState("name") || "刘洋";
  let code = getState("code") || "";
  let code1 = code.length >= 6 ? code.slice(0, 6) : "320101";
  let code2 = code.length >= 4 ? code.slice(-4) : "0042";
  document.querySelector(".code1").innerHTML = code1;
  document.querySelector(".code2").innerHTML = code2;
  Array.from(document.querySelectorAll(".name")).forEach(
    (el) => (el.innerHTML = name)
  );
}

function getHs() {
  let hs = [];
  try {
    hs = JSON.parse(getState("hs"));
    if (!Array.isArray(hs)) {
      hs = [];
    }
  } catch (e) {}
  return hs;
}

function setHs() {
  displayHs();
  Array.from(document.querySelectorAll(".loc")).forEach((el) => {
    el.addEventListener("dblclick", (ev) => {
      let hs = getHs();
      let index = ev.target.dataset.index;
      let loc = prompt("采样点:", hs[index]?.[0] || "");
      if (loc == null) {
        return;
      }
      hs[index] = hs[index] || [];
      hs[index][0] = loc;
      setState("hs", JSON.stringify(hs));
      displayHs();
    });
  });
  Array.from(document.querySelectorAll(".time")).forEach((el) => {
    el.addEventListener("dblclick", (ev) => {
      let hs = getHs();
      let index = ev.target.dataset.index;
      let time = prompt("检测时间(yyyy-MM-dd HH:mm:ss):", hs[index]?.[1] || "");
      if (time == null) {
        return;
      }
      hs[index] = hs[index] || [];
      hs[index][1] = time;
      setState("hs", JSON.stringify(hs));
      displayHs();
    });
  });
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // [min,max)
}

// randtime(20, 4) => [20:00:00, 23:59:59)
function randtime(startHour = 0, hourlen = 24) {
  let seconds = getRandomInt(0, hourlen * 3600);
  let hours = Math.floor(seconds / 3600);
  let remaining = seconds % 3600;
  let minutes = Math.floor(remaining / 60);
  hours = (startHour + hours) % 24;
  seconds = remaining % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

function fakeHsTime(type = 0) {
  return type == 1 ? randtime(20, 4) : randtime(20, 8);
}

function displayHs() {
  displayHsBasicInfo();
  let hs = getHs();
  let defaultLoc = hs[0]?.[0] || "社区采样点";
  Array.from(document.querySelectorAll(".hs")).forEach((el, i) => {
    let locEl = el.querySelector(".loc");
    let timeEl = el.querySelector(".time");
    locEl.innerHTML = hs[i]?.[0] || defaultLoc;
    let faketime =
      formatDate(getBeijingTime(-86400 * 1000 * (1 + i * 2))) +
      " " +
      (hs[i] && hs[i][1] ? hs[i][1].slice(-8) : fakeHsTime(+(i == 0)));
    if (hs[i] && hs[i][1] > faketime) {
      faketime = hs[i][1];
    }
    timeEl.innerHTML = faketime;

    el.classList.remove("list-container-item", "list-container-item1");
    el.classList.add(
      Math.abs(Date.parse(formatTime()) - Date.parse(faketime)) <
        86400 * 1000 * 2
        ? "list-container-item1"
        : "list-container-item"
    );
  });
}

function displayLatestHs() {
  let hs = getHs();
  document.querySelector('*[data-fhcvalue="latesthsloc"]').innerHTML =
    hs[0]?.[0] || "社区采样点";
  let faketime =
    formatDate(getBeijingTime(-86400 * 1000)) + " " + fakeHsTime(1);
  document.querySelector('*[data-fhcvalue="latesthstime"]').innerHTML =
    hs[0] && hs[0][1] > faketime ? hs[0][1] : faketime;
}

function randomStr(length, type) {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  if (type == 1) {
    characters = "0123456789abcdef";
  }
  let charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function setState(key, value) {
  if (typeof key == "object") {
    Object.keys(key).forEach((k) => {
      setState(k, key[k]);
    });
    return;
  }
  if (USE_HASH) {
    let params = getHashParams();
    params.set(key, value);
    try {
      window.top.location.hash = "#" + params.toString();
    } catch (e) {
      location.hash = "#" + params.toString();
    }
  } else {
    localStorage.setItem(key, value);
  }
}

function getState(key) {
  if (USE_HASH) {
    return getHashParams(key);
  } else {
    return localStorage.getItem(key);
  }
}

function getHashParams(key) {
  let hash = "";
  try {
    hash = window.top.location.hash;
  } catch (e) {
    hash = location.hash;
  }
  if (hash[0] == "#") {
    hash = hash.slice(1);
  }
  let params = new URLSearchParams(hash);
  if (key) {
    params = params.get(key);
  }
  return params;
}
