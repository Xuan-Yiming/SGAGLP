import { useState } from "react"


export function useLocalStorage(llave, valor) {

    const [variable, setVariable] = useState(() => {
        try {
            const item = window.localStorage.getItem(llave)
            return item ? JSON.parse(item) : valor
        } catch (error) {
            return valor
        }
    })

    const setValor = value => {
        try {
            setVariable(value)
            window.localStorage.setItem(llave, JSON.stringify(value))

        } catch (error) {

            console.error(error)

        }



    }

    return [variable, setValor]

}