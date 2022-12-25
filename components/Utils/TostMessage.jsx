import { toast } from "react-toastify";

export default function TostMessage(message, type, time) {
  if (type) {
    toast[type](message, {
      position: "top-center",
      autoClose: time || 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    toast.success(message, {
      position: "top-center",
      autoClose: time || 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
}
