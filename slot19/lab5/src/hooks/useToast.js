import { toast } from "react-toastify";


export const useToast = () => {
return {
success: (m) => toast.success(m),
error: (m) => toast.error(m),
info: (m) => toast.info(m),
};
};