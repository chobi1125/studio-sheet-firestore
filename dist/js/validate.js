let all_name = [];

let beforeValidate = () => {
  beforeValidateName();
  beforeValidateCheck();
  if (beforeValidateName() === true && beforeValidateCheck() === true){
    return true;
  };
}

// 名前のバリデーション
let beforeValidateName = () => {
  // 名前かぶりのチェックをした後に空じゃないかチェック
  // 名前かぶりのメッセージ
  firebase_db_all.map((obj) => {
    all_name.push(obj.name);
  })
  console.log(all_name.indexOf(user_name.value));
  if (all_name.indexOf(user_name.value) !== -1){
    console.log("名前かぶり")
    validate_overlap_name.className = "display-block validate-message"
  } else {
    console.log("名前かぶりはなし")
    if(user_name.value != ""){
      return true;
    } else {
      console.log("validate name fail")
      validate_message_name.className = "display-block validate-message"
    }
  }
}

user_name.addEventListener('change', () => {
  if (user_name.value !== "") {
    validate_message_name.className = "display-none";
  }

  if (all_name.indexOf(user_name.value) == -1){
    console.log("名前かぶり解消")
    validate_overlap_name.className = "display-none"
  }
})

// チェックボックスのバリデーション
let beforeValidateCheck = () => {
  if(checkbox_array.length != 0){
    return true;
  } else {
    console.log("validate check fail")
    validate_message_check.className = "display-block validate-message"
  }
}


let checkValidateMessageNone = () => {
  if (checkbox_array.length != 0) {
    validate_message_check.className = "display-none";
  }
}