let firebase_db_key = [];
let firebase_db_all = [];

// DB取得
let databaseInitFC = () => {
  db.collection("users").get().then( snapshot => {
    console.log(snapshot);
    snapshot.forEach((doc) => {
      // console.log(doc.id); // key
      // console.log(doc.data()); // オブジェクト
      firebase_db_key.push(doc.id);
      firebase_db_all.push(doc.data());
    });
    people_number.textContent = `参加者人数：${firebase_db_all.length}人`
  });
}

// DB追加
let addFC = () => {
  if(beforeValidate()){
    console.log("validate=true")
    // ifログインしているelseログインしていない
    if(firebase.auth().currentUser != null){
      console.log("login");
      db.collection("users").doc(firebase.auth().currentUser.uid).set({
        name:user_name.value,
        id:checkbox_array,
        state:"login"
      });
    } else {
      console.log("not_login")
      db.collection("users").doc(user_name.value).set({
        name:user_name.value,
        id:checkbox_array,
        state:"not_login"
      });
    };
    location.reload();
  };
};

// DB更新
let editFC = () => {
  console.log("edit")
  if(beforeValidateCheck()){
    // 名前のバリデートはしない。→名前の編集できないようにすべし！！
    db.collection("users").doc(firebase.auth().currentUser.uid).update({
      id:checkbox_array,
    });
    location.reload();
  }
}

// DB削除
let removeFC = () => {
  if(window.confirm("本当に削除してもいいですか？")){
    db.collection("users").doc(firebase.auth().currentUser.uid).delete();
    location.reload();
  };
}