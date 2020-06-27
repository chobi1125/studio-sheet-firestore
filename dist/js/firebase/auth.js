let firebase_db_user; // ログインユーザーの情報

// ログイン確認
let loginCheckFC = () => {
  if (firebase.auth().currentUser != null){
    db.collection(`users`).doc(firebase.auth().currentUser.uid)
    .get().then(snapshot => {
      loggedInFC(snapshot.data());
      // rootの場合
      if(snapshot.data() !== undefined && snapshot.data().state === "root"){
        rootFC();
        // 会計処理
        accountingFC();
      };
      firebase_db_user = snapshot.data();
    });
  }
};
// ログインしていた場合の処理
let loggedInFC = (obj) => {
  // if初回登録の場合else登録済みの場合
  if (obj === undefined){
    user_name.value = firebase.auth().currentUser.displayName;
  } else {
    user_name.value = obj.name;
    user_name.readOnly = true;
    add_btn.className = "display-none";
    edit_btn.className = "display-inline";
    remove_btn.className = "display-inline";
  };
  login_btn.className = "display-none";
  logout_btn.className = "display-inline";
  supplement_message.textContent = "ログインありがとうございます！！送信したデータが確認できます";
  // チェックタグの反映
  if (obj != null) {
    obj.id.map((id) => {
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