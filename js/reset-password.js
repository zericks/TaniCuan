let icon = document.getElementById("btnView");
let iconConf = document.getElementById("btnViewConf");

function fnView() {
  if (password.value != "" && password.type === "password") {
    password.type = "text";
    icon.innerHTML = '<i data-feather="eye">';
    icon.title = "sembunyikan password";
  } else {
    password.type = "password";
    icon.innerHTML = '<i data-feather="eye-off">';
    icon.title = "lihat password";
  }
  feather.replace();
}

function fnViewConf() {
  if (pin.value !== "" && pin.type === "password") {
    pin.type = "text";
    iconConf.innerHTML = '<i data-feather="eye"></i>';
    iconConf.title = "Sembunyikan konfirmasi password";
  } else {
    pin.type = "password";
    iconConf.innerHTML = '<i data-feather="eye-off"></i>';
    iconConf.title = "Lihat konfirmasi password";
  }
  feather.replace();
}
