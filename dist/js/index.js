let $ = e => document.getElementById(e);
let q = e => document.querySelector(e);
let l = e => console.log(e);
let el = e => document.createElement(e);

// HTMLより取得した要素の変数定義
let change_btn = $("changeBtn");
let login_btn = $("loginBtn");
let logout_btn = $("logoutBtn");
let user_name = $("userName");
let people_number = $("peopleNumber");
let form = $("form");
let sheet = $("sheet");
let vo0 = $("vo0");
let song_checkbox_all = $("songCheckboxAll");
let supplement_message = q(".supplement-message");

// js処理のための変数定義
let checkbox_array = [];

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
});