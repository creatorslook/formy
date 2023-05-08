import { FC } from 'react';
// import "./formy.css"

interface ButtonType
    extends React.DetailedHTMLProps<
        React.ButtonHTMLAttributes<HTMLButtonElement>,
        HTMLButtonElement
    > {
    name?: string;
    customStyles?: string;
}

const Button: FC<ButtonType> = ({ name, disabled, customStyles, ...props }) => {
    return (
        <>
            <button
                className={customStyles ? customStyles : "button"}
                disabled={disabled}
                type={props.type ? `${props.type}` : 'submit'}
                {...props}
            >
                {name ? name : 'Submit'}
            </button>
        </>
    );
};

export default Button;
