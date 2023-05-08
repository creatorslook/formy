import { FC, useState, useCallback } from 'react';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    regex?: RegExp;
    state?: any;
    setState?: React.Dispatch<React.SetStateAction<any>>;
    regexErrorMessage?: string;
    customStyles?: {
        wrapper?: string;
        label?: string;
        labelError?: string;
        input?: string;
        inputError?: string;
        infoGroup ?: {
            wrapper ?: string
            svg?: string;
            svgError?: string;
            errorMessage?: string;
        }
       
    };
}

const Field: FC<FieldProps> = ({
    regex,
    state,
    setState,
    regexErrorMessage,
    customStyles,
    ...props
}) => {
    const [error, setError] = useState(false);
    const [touched, setTouched] = useState<boolean>(false);
    const wrapper = customStyles?.wrapper;
    const label = customStyles?.label;
    const labelError = customStyles?.labelError;
    const input = customStyles?.input;
    const inputError = customStyles?.inputError;
    const svg = customStyles?.infoGroup?.svg
    const group = customStyles?.infoGroup?.wrapper
    const svgError = customStyles?.infoGroup?.svgError;
    const errorMessage = customStyles?.infoGroup?.svgError;

    const handleCurrentValue = useCallback(() => {
        if (regex?.test(state)) {
            setError(false);
            setTouched(false);
        } else {
            setError(true);
            setTouched(true);
        }
    }, [state]);

    return (
        <div className={wrapper ? wrapper : "fieldWrapper"}>
            <label
                className={error ? label ? label : "fieldLabelError" : labelError? labelError : "fieldLabel"}
                htmlFor={props.name}
            >
                {error ? `Invalid ${props.name}` : props.name}
            </label>
            
            <input
                className={touched || error ? inputError ? inputError : "fieldError" : input ? input :  "field"}
                onChange={(e) => {
                    regex && state ? handleCurrentValue() : '';
                    setState ? setState(e.target.value) : '';
                }}
                type={props.type ? props.type : 'text'}
                onClick={() => {
                    error ?? setTouched(true);
                }}
                {...props}
            />

            <div className={group ? group : "group"}>
                {regexErrorMessage ? (
                    <svg className={error || touched ? svgError ? svgError : "infoError" : svg ? svg :"info"} strokeWidth="2" width="24" height="24" viewBox='0 0 24 24' stroke='black' fill='none'>
                        <path d="M12 16V12M12 8H12.01M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke='inherit' strokeWidth="inherit" strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                ) : (
                    ''
                )}
                {regexErrorMessage ? <span className={errorMessage ? errorMessage : ""}>{regexErrorMessage}</span> : ''}
            </div>
        </div>
    );
};

export default Field;
