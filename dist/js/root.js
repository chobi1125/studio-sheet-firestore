let edit_user_obj;

// rootユーザー用の編集権限
let rootFC = () => {
  console.log("root");
  root_edit.className = "display-inline";
  firebase_db_root.map((value) => {
    console.log(value.name);
    let option = el('option');
    option.value = value.name;
    option.textContent = value.name;
    option.id = value.name;
    root_edit.appendChild(option);
  })
}

root_edit.addEventListener('change', (event) => {
  console.log("select");
  let eventElem = event.target;
  console.log(eventElem.value)
  firebase_db_root.map((value) => {
    if (value.name === eventElem.value) {
      edit_user_obj = value;
    }
  })
  console.log(edit_user_obj);
  // チェックをリセットする
  Array.from(all_checkbox).map((nodelist) => {
    nodelist.checked = false;
  })
  // チェックを付ける
  edit_user_obj.id.map((id) => {
    let v_id = document.getElementById(id);
    v_id.checked = true; // input要素にcheck付ける
  });
  checkbox_array = edit_user_obj.id; // 登録時に使う配列にデータを初期値として0ベースで更新
  root_edit_btn.className = "display-inline";
  root_remove_btn.className = "display-inline";
  root_message.className = "display-blcok supplement-message";
  add_btn.className = "display-none";
  remove_btn.className = "display-none";
});

let rootEditFC = () => {
  console.log("rootEditFC!!")
  console.log(firebase_db_all.not_login)
  let checkNotLoginUser = Object.keys(firebase_db_all.not_login) //ここまでで名前 ["test3", "testt2"]
  .filter(function(value) {
    console.log(value); // test3とtestt2をそれぞれ1回ずつ出力
    return firebase_db_all.not_login[value].name == edit_user_obj.name; // 該当した場合配列を返す
    // firebase_db_all.not_login.test3.nameを出力している
  });
  let checkLoginUser = Object.keys(firebase_db_all.login) //ここまでで名前 ["test3", "testt2"]
  .filter(function(value) {
    console.log(value); // test3とtestt2をそれぞれ1回ずつ出力
    return firebase_db_all.login[value].name == edit_user_obj.name; // 該当した場合配列を返す
    // firebase_db_all.not_login.test3.nameを出力している
  });

  console.log(checkNotLoginUser.length);
  console.log(checkLoginUser.length);

  if (checkNotLoginUser.length === 1){
    db.ref(`/users/not_login/${edit_user_obj.name}/`).update({
      id:edit_user_obj.id,
      name:edit_user_obj.name
    });
  } else if (checkLoginUser.length === 1) {
    db.ref(`/users/login/${edit_user_obj.name}/`).update({
      id:edit_user_obj.id,
      name:edit_user_obj.name
    });
  }
  location.reload();
};

let rootRemoveFC = () => {
  console.log("rootRemoveFC!!")
  db.ref(`/users/not_login/${edit_user_obj.name}/`).remove();
  location.reload();
}