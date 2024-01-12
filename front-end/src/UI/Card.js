import './Card.css'

const Card = (props) => {
    const classTemp = props?.className ? props.className : '';
    const className = 'card' + classTemp;
    return <div className={className}>
        {props.children}
    </div>
}

export default Card;