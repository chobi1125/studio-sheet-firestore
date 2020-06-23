// let firebase_db_not_login = [];
// let firebase_db_login = [];
let firebase_db_root = [];
let firebase_db_sheet;

let mkSheetFC = () => {
  // 未ログインユーザー
  db.ref(`/users/not_login`).on('child_added', (data) => {
    firebase_db_sheet = data.val();
    firebase_db_root.push(data.val());
    // DBにデータがあった場合
    if (firebase_db_sheet != null) {
      // 2つ以上＝配列だった場合
      if (Array.isArray(firebase_db_sheet.id) === true){
        firebase_db_sheet.id.map((id) => {
          let sheet_elem = document.getElementById(`sheet_${id}`);
          // ifまだ名前がシートにない場合elseある場合
          if (sheet_elem.textContent != ""){
            sheet_elem.innerHTML = `${sheet_elem.innerHTML}<br>${firebase_db_sheet.name}`;
          } else {
            sheet_elem.textContent = firebase_db_sheet.name;
          }
        });
        // 1つ=配列じゃなかった場合
      } else {
        let sheet_elem = document.getElementById(`sheet_${firebase_db_sheet.id}`);
        // ifまだ名前がシートにない場合elseある場合
        if (sheet_elem.textContent != ""){
          sheet_elem.innerHTML = `${sheet_elem.innerHTML}<br>${firebase_db_sheet.name}`;
        } else {
          sheet_elem.textContent = firebase_db_sheet.name;
        }
      }
    };
  });
  // ログインユーザー
  console.log("mksheet_login");
  db.ref(`/users/login`).on('child_added', (data) => {
    firebase_db_sheet = data.val();
    firebase_db_root.push(data.val());
    if (firebase_db_sheet != null) {
      if (Array.isArray(firebase_db_sheet.id) === true){
        firebase_db_sheet.id.map((id) => {
          let sheet_elem = document.getElementById(`sheet_${id}`);
          if (sheet_elem.textContent != ""){
            sheet_elem.innerHTML = `${sheet_elem.innerHTML}<br>${firebase_db_sheet.name}`;
          } else {
            sheet_elem.textContent = firebase_db_sheet.name;
          }
        });
      } else {
        let sheet_elem = document.getElementById(`sheet_${firebase_db_sheet.id}`);
        if (sheet_elem.textContent != ""){
          sheet_elem.innerHTML = `${sheet_elem.innerHTML}<br>${firebase_db_sheet.name}`;
        } else {
          sheet_elem.textContent = firebase_db_sheet.name;
        }
      }
    };
  });
  // ルートユーザー
  db.ref(`/users/root`).on('child_added', (data) => {
    firebase_db_sheet = data.val();
    firebase_db_root.push(data.val());
    if (firebase_db_sheet != null) {
      if (Array.isArray(firebase_db_sheet.id) === true){
        firebase_db_sheet.id.map((id) => {
          let sheet_elem = document.getElementById(`sheet_${id}`);
          if (sheet_elem.textContent != ""){
            sheet_elem.innerHTML = `${sheet_elem.innerHTML}<br>${firebase_db_sheet.name}`;
          } else {
            sheet_elem.textContent = firebase_db_sheet.name;
          }
        });
      } else {
        let sheet_elem = document.getElementById(`sheet_${firebase_db_sheet.id}`);
        if (sheet_elem.textContent != ""){
          sheet_elem.innerHTML = `${sheet_elem.innerHTML}<br>${firebase_db_sheet.name}`;
        } else {
          sheet_elem.textContent = firebase_db_sheet.name;
        }
      }
    };
  });
}