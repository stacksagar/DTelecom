import { db } from "../firebase";
import { onValue, ref } from "firebase/database";

export default function set_user(dispatch, user) {
  let info = {
    email: user?.email,
    name: user?.displayName,
    uid: user?.uid,
  };

  onValue(ref(db), (snapshot) => {
    const data = snapshot.val();
    const users = data?.users;
    if (Object.keys(users || {}).indexOf(user?.uid) > -1) {
      dispatch({
        type: "set_user",
        payload: { ...info, ...users[user?.uid] },
      });
    }
  });
}
