'use client'

import {createContext, useState} from 'react';

export const ctxAccountData = createContext({
    accountData : {},
    setAccountData : () => {}
})

export default function AccountDataProvider({children}) {
    const [accountData, setAccountData] = useState(null);

    const ctxAccountDataValue = {
        accountData, setAccountData
    }

    return <ctxAccountData.Provider value={ctxAccountDataValue}>
        {children}
        </ctxAccountData.Provider>

}