// Your web app's Firebase configuration
let firebaseConfig = {
  apiKey: "AIzaSyD3rGKOE0UE-L59oi9w_YAchz_4KgsptwQ",
  authDomain: "studio-sheet.firebaseapp.com",
  databaseURL: "https://studio-sheet.firebaseio.com",
  projectId: "studio-sheet",
  storageBucket: "studio-sheet.appspot.com",
  messagingSenderId: "291454441337",
  appId: "1:291454441337:web:d6a58e89157bb54bb901a8",
  measurementId: "G-WJ4TEH1HVK",
};

firebase.initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
firebase.analytics();
// google login
let provider = new firebase.auth.GoogleAuthProvider();
// offline
let presenceRef = firebase.database().ref("disconnectmessage");
presenceRef.onDisconnect().set("I disconnected!");
// database
let db = firebase.database();

// 接続
let async = () =>{
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // if ( firebase.auth().currentUser !== null){
      if ( firebase !== undefined){
        resolve("firebase接続完了")
      } else {
        reject("firebase接続失敗(未ログインの可能性あり)")
      }
    }, 2000)
  })
}
// 接続後
async()
  .then(
    response => {
    console.log(response);
    firebaseConnected();
    }
  )
  .catch(
    error => {
    console.log(error);
    firebaseConnected();
    }
  )

// 接続後の処理まとめ
let firebaseConnected = () => {
  databaseInitFC();
};