import { useEffect, useState } from 'react';

interface VerifyProps {
    state?: any;
    regex?: RegExp;
}

const useVerify = (props: VerifyProps[]) => {
    const [isValid, setValid] = useState<boolean | undefined>(false);

    const deps = props.map((state) => {
      return state.state
    })

    useEffect(() => {
        setValid(props.every(({ state, regex }) => regex?.test(state)));
    }, [deps]);

    return isValid;
}

export default useVerify;
