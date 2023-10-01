// 'use client'
// import { hasCookie, getCookie, getCookies, setCookie, deleteCookie } from 'cookies-next';

var cookie = require('@boiseitguru/cookie-cutter')
const COOKIE_AUTH_TOKEN_KEY = 'user-qie'

export function isLoggedIn(){
    if (cookie.get(COOKIE_AUTH_TOKEN_KEY)) {
        return true
    }
    return false
}

export function getAuthToken(){
    return cookie.get(COOKIE_AUTH_TOKEN_KEY)
}

export function setAuthToken(token){
    cookie.set(COOKIE_AUTH_TOKEN_KEY, token)
}

export function removeAuthToken(){
    cookie.set(COOKIE_AUTH_TOKEN_KEY, '', {expires: new Date(0)})
}