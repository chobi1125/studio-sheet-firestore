let firebase_name_all = [];

let mkSheetFC = () => {
  db.collection(`users`).get().then(snapshot => {
      // console.log("mksheet_root")
      snapshot.forEach(doc => {
        mkSheetText(doc.data());
      });
    }); 
}

let mkSheetText = (obj) => {
  obj.id.map((n) => {
    let sheet_elem = document.getElementById(`sheet_${n}`);
    let mkText = document.createElement('p');
    mkText.textContent = `・${obj.name}`;
    sheet_elem.appendChild(mkText);
  })
}
