import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
    const [debouncedValue, setDebounceValue] = useState(value);

    useEffect(() => {
        //delay lại khoảng time set alue của debounce
        const handler = setTimeout(() => setDebounceValue(value), delay); //đặt biến handler để lấy đc timeoutid của setTimeuot trả về

        //clearup function: đc gọi khi deps thay đổi hoặc component unmounted
        return () => clearTimeout(handler);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);
    return debouncedValue;
}

export default useDebounce;
