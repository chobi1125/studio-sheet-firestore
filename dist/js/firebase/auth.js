// ログインしている場合※ユーザーごと
let loggedInFC = () => {
  console.log("loggedInFC");
  // if初回登録の場合else登録済みの場合
  if (firebase_db_user === null){
    user_name.value = firebase.auth().currentUser.displayName;
  } else {
    user_name.value = firebase_db_user.name;
    add_btn.textContent = "更新";
    remove_btn.className = "display-inline";
  };
  login_btn.className = "display-none";
  logout_btn.className = "display-inline";
  supplement_message.textContent = "ログインありがとうございます！！送信したデータが確認できます";
  // チェックタグの反映
  if (firebase_db_user != null) {
    firebase_db_user.id.map((id) => {
      let v_id = document.getElementById(id);
      v_id.checked = true; // input要素にcheck付ける
      checkbox_array.push(id); // 登録時に使う配列にデータを初期値としてpush
    });
  };
};
// ログイン処理
let loginFC = ()=> {
  firebase.auth().signInWithRedirect(provider).then(function(result) {
  }).catch(function(error) {
    errorCode = error
  });
};

// ログイン方法がリダイレクトの場合
firebase.auth().getRedirectResult().then(function(result) {
  if (result.credential) {
    location.reload();
  }
}).catch(function(error) {
  l("redirected false")
});

// ログアウト処理
let logoutFC = ()=> {
  firebase.auth().signOut().then(() => {
    l("Sign-out successful.")
    location.reload();
  }).catch(function(error) {
    l("logout false")
  });
}