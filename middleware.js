import { NextResponse } from "next/server"
import {cookies} from 'next/headers'

export function middleware(request) {
    const cookie = cookies().get('session');

    if (cookie && request.nextUrl.pathname.startsWith('/login')) {
        return NextResponse.redirect(new URL('/', request.url))
    }
    else if (cookie) {
        return NextResponse.next();
    }

    else if (!request.nextUrl.pathname.startsWith('/login') && !request.nextUrl.pathname.startsWith('/_next')){
    return NextResponse.redirect(new URL('/login', request.url)); 
    }

}