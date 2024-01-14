function Button({ btnData, onBtnClick }) {
    return (
        <button 
            type="button"
            className={btnData.className}
            value={btnData.value}
            data-action={btnData.type}
            onClick={onBtnClick}
        >
            {btnData.text}
        </button>
    )
}

export default Button;