import moment from "moment";
import TokenManager from "../config/token-manager.util";

export const getDate = () => {
    return moment.now();
}

export const timeDifference = () => {
    return moment().diff(parseInt(TokenManager.getDate()), 'minutes');
}