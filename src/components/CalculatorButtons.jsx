function Button({ btnData }) {
    return (
        <button 
            type="button"
            className={btnData.className}
            value={btnData.value}
            data-action={btnData.type}

        >
            {btnData.text}
        </button>
    )
}

export default Button;