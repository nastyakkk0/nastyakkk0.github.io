function pop_up(){
    let bg = document.getElementById("popup_bg");
    bg.style.display="block";
    history.pushState(true, null, "#form");
}

function close_popup(){
  if (location.hash != "#form") {
    //popup(true);
    let bg = document.getElementById("popup_bg");
    bg.style.display="none"
    history.pushState(false, null, "#");
  }
}

window.onbeforeunload = function(){
  return "Есть несохранённые изменения. Всё равно уходим?";
  alert("ok");
  localStorage.setItem("Name", document.form1.my_form.name.value);
  console.log(document.form1.my_form.name.value);
  localStorage.setItem("Email", document.form1.my_form.email.value);
  console.log(document.form1.my_form.email.value);
  localStorage.setItem("Msg", document.form1.my_form.msg.value);
  console.log(document.form1.my_form.msg.value);
  console.log(document.form1.my_checkbox.checked);
  if (document.form1.my_checkbox.checked) {
      localStorage.setItem('Checkbox', 1);
    } else {
      localStorage.setItem('Checkbox', 0);
    }
}

function popup(par) {
    console.log(par);
    let formDiv = document.getElementById("forma");
    let bg = document.getElementById("popup_bg");

    if (par === true) {
      formDiv.style.display = ("block");
      bg.style.opacity = ("1");
      bg.style.pointerEvents = ("all");
      history.pushState(true, null, "#form");
    }
    else {
      formDiv.style.display = ("none");
      bg.style.opacity = ("0");
      bg.style.pointerEvents = ("none");
      history.pushState(false, null, "#");
    }
  }
  let names = document.getElementById("InputName");
  let email = document.getElementById("InputEmail");
  let msg = document.getElementById("Textarea");
  let cb = document.getElementById("Check");

  function save() {
    localStorage.setItem("Имя", names.value);
    localStorage.setItem("Почта", email.value);
    localStorage.setItem("Сообщение", msg.value);
    if (cb.checked) {
        localStorage.setItem('Чекбокс', 1);
      } else {
        localStorage.setItem('Чекбокс', 0);
      }
  }

  // document.addEventListener("DOMContentLoaded", function (event) {
  //   if (location.hash === "#form") {
  //     popup(true);
  //   }
  //   window.addEventListener("popstate", (e) => {
  //     popup(e);
  //   });
  
   
    let popupBg = document.getElementById("popup_bg");
    document.addEventListener("click", (e) => {
      if (e.target === popupBg) {
        popup(false);
      }
    });

    names.value = localStorage.getItem("Имя");
    email.value = localStorage.getItem("Почта");
    msg.value = localStorage.getItem("Сообщение");
    let checkBox = localStorage.getItem('Чекбокс');
    if (checkBox == 1) {
      cb.checked = true;
    } else if (checkBox == 0) {
      cb.checked = false;
    }
  
    name.oninput = save;
    email.oninput = save;
    msg.oninput = save;
    cb.onclick = save;
 
  $(function () {
    $(".ajaxForm").submit(function (e) {
      e.preventDefault();
      var href = $(this).attr("action");
      $.ajax({
        type: "POST",
        dataType: "json",
        url: href,
        data: $(this).serialize(),
        success: function (response) {
          if (response.status === "success" && (cb.checked == true)) {
            alert("Успешно!");
            localStorage.removeItem("Имя");
            localStorage.removeItem("Почта");
            localStorage.removeItem("Сообщение");
            localStorage.removeItem("Чекбокс");
            names.value = localStorage.getItem("Имя");
            email.value = localStorage.getItem("Почта");
            msg.value = localStorage.getItem("Сообщение");
            cb.checked = false;
          } else {
            alert("Ошибка! " + response.message);
          }
        }
      });
    });
  });
