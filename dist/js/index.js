let $ = e => document.getElementById(e);
let q = e => document.querySelector(e);
let l = e => console.log(e);
let el = e => document.createElement(e);

// HTMLより取得した要素の変数定義
let change_btn = $("changeBtn");
let add_btn = $("addBtn");
let remove_btn = $("removeBtn");
let root_edit_btn = $("rootEditBtn");
let root_remove_btn = $("rootRemoveBtn");
let login_btn = $("loginBtn");
let logout_btn = $("logoutBtn");
let user_name = $("userName");
let people_number = $("peopleNumber");
let root_edit = $("rootEdit");
let form = $("form");
let sheet = $("sheet");
let validate_message_name = $("validateMessageName");
let validate_message_check = $("validateMessageCheck");
let song_checkbox_all = $("songCheckboxAll");
let supplement_message = $("supplement-message");
let root_message = $("rootMessage");
let sheet_visiter = $("sheet_visiter");

// js処理のための変数定義
let checkbox_array = [];
let root_check_array = [];
let all_checkbox = document.querySelectorAll("input[type='checkbox']");

// フォームと管理シートの切り替え
let changeFC = () => {
  if (form.className === "display-block"){
    form.className = "display-none";
    sheet.className = "display-block"
    change_btn.textContent = "フォーム"
  } else {
    form.className = "display-block";
    sheet.className = "display-none"
    change_btn.textContent = "管理シート"
  }
}

let beforeValidate = () => {
  beforeValidateName();
  beforeValidateCheck();
  if (beforeValidateName() === true && beforeValidateCheck() === true){
    return true;
  };
}

// 名前のバリデーション
let beforeValidateName = () => {
  if(user_name.value != ""){
    return true;
  } else {
    console.log("validate name fail")
    validate_message_name.className = "display-block validate-message"
  }
}

user_name.addEventListener('change', () => {
  if (user_name.value !== "") {
    validate_message_name.className = "display-none";
  }
})

// チェックボックスのバリデーション
let beforeValidateCheck = () => {
  if(checkbox_array.length != 0){
    return true;
  } else {
    console.log("validate check fail")
    validate_message_check.className = "display-block validate-message"
  }
}

// DBに追加するIDタグの配列生成
song_checkbox_all.addEventListener('change', (event) => {
  let eventElem = event.target;
  // チェックが入って、かつ配列になかった場合
  if (eventElem.checked === true && checkbox_array.indexOf(eventElem.id) === -1) {
    console.log("push")
    checkbox_array.push(eventElem.id);
  }
  // チェックが外れた場合
  if (eventElem.checked === false ) {
    let delKey = checkbox_array.indexOf(eventElem.id);
    checkbox_array.splice(delKey,1);
  }
  l("change");
  if (checkbox_array.length != 0) {
    validate_message_check.className = "display-none";
  }
});

