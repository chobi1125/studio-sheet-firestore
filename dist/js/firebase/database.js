let all_data = [];
let login_user_data = [];
let firebase_db_latest;

// DB追加
let addFC = () => {
  console.log("addFC")
  if(firebase.auth().currentUser != null) {
    db.ref(`/users/${firebase.auth().currentUser.displayName}/`).set({
      name:user_name.value,
      id:checkbox_array // 配列で保存
      // id:checkbox_array.toString() // 文字列で保存
    });
  } else {
    db.ref(`/users/${user_name.value}/`).set({
      name:user_name.value,
      id:checkbox_array.toString()
    });
  }
}
// DB取得
let databaseInitFC = () => {
  let all_DB = db.ref(`/users`);
  // DB取得※usersを取得。配列キーの数を参考に参加者人数算出。
  all_DB.on('child_added', (data) => {
    console.log("全てのDBを取得")
    firebase_db_all = data.val();
    all_data.push(firebase_db_all);
    people_number.textContent = `参加者人数：${all_data.length}人`
  });
  if (firebase.auth().currentUser != null){
    console.log("Data取得※ログイン中")
    let connect_DB = db.ref(`/users/${firebase.auth().currentUser.displayName}`);
      // DB取得※ユーザー毎
    connect_DB.on('child_added', (data) => {
      firebase_db_latest = data.val();
      console.log("login_user_data.push")
      login_user_data.push(firebase_db_latest);
      loggedInFC();
    });
    // DB更新が発生した際の処理(リロード)
    connect_DB.on('child_changed', function(data) {
      location.reload();
    });
    // DB削除が発生した際の処理(リロード)
    connect_DB.on('child_removed', function(data) {
      location.reload();
    });
  }
}