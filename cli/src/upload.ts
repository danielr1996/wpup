import {EMPTY, from, Observable, of, throwError} from "rxjs";
import * as glob from 'glob';
import axios, {AxiosError} from "axios";
import * as https from "https";
import * as fs from "fs";
import {catchError, map, mergeMap, pluck} from "rxjs/operators";

const FormData = require('form-data');

export function uploadTheme(url: string | undefined, theme: string | undefined, user: string | undefined, token: string | undefined, activate: boolean = false, ignoressl: boolean = false, dry: boolean = false): Observable<any> {
    if (!url) {
        console.error('Please specify url with -u or --url')
        return EMPTY;
    } else if (!theme) {
        console.error('Please specify theme with -t or --theme')
        return EMPTY;
    } else if (!user) {
        console.error('Please specify user with -u or --user')
        return EMPTY;
    } else if (!token) {
        console.error('Please specify token with -p or --token')
        return EMPTY;
    } else {
        const themePath = glob.sync(theme)[0];
        console.log(`Uploading theme ${themePath} to ${url}(ignoressl: ${ignoressl})(activate: ${activate}).`);
        const client = axios.create({
            httpsAgent: new https.Agent({
                rejectUnauthorized: !ignoressl
            }),
            maxContentLength: 1000000000,
            baseURL: url,
        });

        const formData = new FormData();
        formData.append('theme', fs.createReadStream(themePath));
        // TODO: Check if file exists
        if (dry) {
            return EMPTY;
        }
        return from(client.post<{ status: 'success' | 'error', message: string }>(`/wp-json/wpup/v1/upload${activate ? '?activate' : ''}`, formData, {
            headers: formData.getHeaders(),
            auth: {
                username: user,
                password: token,
            }
            //TODO: Fehlerbehandlung
        })).pipe(
            catchError((error: AxiosError) => {
                console.error(error);
                console.error('Error uploading theme ', error.response?.config);
                return EMPTY;
            })
        );
    }
}
