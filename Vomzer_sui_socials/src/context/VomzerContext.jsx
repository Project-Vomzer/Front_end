import { createContext } from "react";

export const VomzerContext = createContext()


const VomzerContextProvider = (props)=> {


    const followers = "1834"
    const following = "5678"


    const value = {
        followers,
        following
    }


    return (
            <VomzerContext.Provider  value={value}>
                {props.children}
            </VomzerContext.Provider>
        )
}


export default VomzerContextProvider