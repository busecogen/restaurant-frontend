import {CallParams} from '@technarts/react-use-api';



export function guard(r: Response, params: CallParams): Promise<Response> {
    if (r.status === 401) {
        window.location.href = "/refresh";
    }
    return Promise.resolve(r);
}

export function refreshGuard(r: Response, params: CallParams): Promise<Response> {
    const status = r.status;
    if (status === 400) {
        window.location.href = "/logout";
    }
    else if (status === 401) {
        window.location.href = "/logout";
    }
    return Promise.resolve(r);
}


