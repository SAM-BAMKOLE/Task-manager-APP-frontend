import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const showToast = (status: string, message: string) => {
    if (status == "error") toast.error(message);
    else if (status == "info") toast.info(message);
    else toast.success(message);
};
