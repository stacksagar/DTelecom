export default function set_user(dispatch, user) {
  const info = {
    email: user?.email,
    name: user?.displayName,
  };

  dispatch({
    type: "set_user",
    payload: info,
  });
}
