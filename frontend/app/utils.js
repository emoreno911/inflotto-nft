import axios from "axios";

const headers = {
    "Cache-Control": "no-cache",
    Pragma: "no-cache",
    Expires: "0",
};

const backendBaseURL = "";

export const request = async ({
    url,
    fname,
    method = "GET",
    data = null,
    _baseURL = null,
}) => {
    const instance = axios.create();
    const baseURL = _baseURL || backendBaseURL;
    return instance
        .request({
            baseURL,
            url,
            method,
            data,
        })
        .then((response) => response.data)
        .catch((err) => {
            const {
                message,
                response: { data, status },
            } = err;
            console.log(`request error in %c ${fname}`, "font-weight:900");
            console.log(message);
            return { err: true, errmsg: message, ...data };
        });
};

export async function getInflationIndex(date = "2022-05-26") {
    const response = await request({
        _baseURL: "https://truflation-api.hydrogenx.tk",
        url: `/at-date?date=${date}&show-derivation=false`,
        fname: "getInflationToday",
    });

    return response;
}

export async function getInflationIndexPd() {
    const response = await request({
        _baseURL: "https://eort27umjcabdsx.m.pipedream.net",
        url: "/",
        fname: "getInflationTodayPd",
    });

    return response;
}

export function weiToMatic(amount) {
    return amount / 1000000000000000000;
}
