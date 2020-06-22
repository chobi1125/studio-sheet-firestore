// ログインしている場合
let loggedInFC = () => {
  let login_user = firebase.auth().currentUser;
  console.log(login_user.displayName);
  console.log(login_user_data[1]);
  // if前回名前を編集していない場合elseしていた場合
  if (login_user.displayName != login_user_data[1]){
    user_name.value = login_user_data[1];
  } else {
    user_name.value = login_user.displayName;
  };
  login_btn.className = "display-none";
  logout_btn.className = "display-inline";
  supplement_message.textContent = "ログインありがとうございます！！送信したデータが確認できます";
  if (login_user_data[0] != null) {
    login_user_data[0].map((id) => {
      let v_id = document.getElementById(id);
      console.log(id)
      v_id.checked = true;
      checkbox_array.push(v_id);
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