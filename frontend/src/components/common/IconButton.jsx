const IconButton = ({ id, ref, ariaLabel, handleClick, children }) => {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === '') {
            e.preventDefault();
            handleClick();
        }
    };

    return (
        <div
            id={`${id}-button`}
            className='icon-button'
            ref={ref || null}
            tabIndex='0'
            role='button'
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            aria-label={ariaLabel}>
            {children}
        </div>
    );
};

export default IconButton;