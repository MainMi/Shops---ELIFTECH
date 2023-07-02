const CardIcon = (props) => {

    let { width, heigth } = props;
    
    width = width ? `${width}px` : '24px';
    heigth = heigth ? `${heigth}px` : '24px';

    return <svg xmlns="http://www.w3.org/2000/svg" width={width} heigth={heigth} viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.1 12.6a2 2 0 0 0 2 1.4h8a2 2 0 0 0 2-1.4L23 6H6"></path>
    </svg>
}
export default CardIcon;