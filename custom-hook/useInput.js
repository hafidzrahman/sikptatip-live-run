import {useState} from 'react';

export default function useInput(initialValue, validationFn) {
    const [inputValue, setInputValue] = useState(initialValue);

    function validateInputValue(value) {
        if (validationFn(value) && !(value[0] === "0" && value.length === 2)) {
            setInputValue(value)
        }
    }

    return ({inputValue, setInputValue : validateInputValue})
} 