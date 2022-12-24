export default function set_formError(dispatch, error) {
  dispatch({
    type: "set_formError",
    payload: error,
  });
  setTimeout(() => {
    dispatch({
      type: "clear_formError",
    });
  }, 4000);
}
