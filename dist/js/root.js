let edit_user;
let editUserKey;

// rootユーザー
let rootFC = () => {
  // console.log("root");
  root_select.className = "display-inline name-select";
  accounting.className = "display-block";
  // セレクトタグのオプションタグ作成
  firebase_db_all.map((obj) => {
    if (obj.state !== "root") {
      let option = el('option');
      option.value = obj.name;
      option.textContent = obj.name;
      option.id = obj.name;
      root_select.appendChild(option);
    };
  });
};

// 会計金額の表示
let accountingFC = () => {
  accounting_text.innerHTML = 
  `今日の合計金額:${firebase_db_all.length * 1500}円<br>※一律1500円で計算。初回の方考慮できていません。`
};

// 編集したいユーザーをセレクトタグから選択
root_select.addEventListener('change', (event) => {
  console.log("select");
  let eventElem = event.target;
  firebase_db_all.map((obj) => {
    if (obj.name === eventElem.value) {
      edit_user = obj;
    }
  });
  // チェックをリセットする
  Array.from(all_checkbox).map((nodelist) => {
    nodelist.checked = false;
  });
  // チェックを付ける
  edit_user.id.map((id) => {
    let v_id = document.getElementById(id);
    v_id.checked = true; // input要素にcheck付ける
  });
  // 登録時に使う配列にデータを初期値として0ベースで更新
  checkbox_array = edit_user.id; 
  root_edit_btn.className = "display-inline";
  root_remove_btn.className = "display-inline";
  root_message.className = "display-blcok supplement-message";
  add_btn.className = "display-none";
  edit_btn.className = "display-none";
  remove_btn.className = "display-none";
  user_name.readOnly = true;
  user_name.value = "※名前の編集不可"
  // 編集中のユーザーのキーを探る 
  editUserKey = Object.keys(firebase_db_all) //ここまでで ["0", "1", "2"]
  .filter(function(value) {
    return firebase_db_all[value].name == edit_user.name; // 該当した場合配列を返す
  });
});

// ルート更新ボタン
let rootEditFC = () => {
  console.log("rootEditFC!!");
  // ログインしていないユーザーの場合
  if(firebase_db_all[editUserKey].state === "not_login" ){  
    console.log("NotLoginUser")
    if(beforeValidateCheck()){
      db.collection("users").doc(edit_user.name).update({
        id:edit_user.id
      });
    };
  };
  // ログインしているユーザーの場合
  if (firebase_db_all[editUserKey].state === "login") {
    if(beforeValidateCheck()){
      db.collection("users").doc(firebase_db_key[editUserKey]).update({
        id:edit_user.id,
      });
    };
  };
  location.reload();
};

// ルート削除ボタン※未ログインユーザーのみ
let rootRemoveFC = () => {
  console.log("rootRemoveFC!!");
  if(window.confirm("本当に削除してもいいですか？")){
    if(firebase_db_all[editUserKey].state === "not_login" ){  
      db.collection("users").doc(edit_user.name).delete();
    };
    if (firebase_db_all[editUserKey].state === "login") {
      db.collection("users").doc(firebase_db_key[editUserKey]).delete();
    };
    location.reload();
  };
};