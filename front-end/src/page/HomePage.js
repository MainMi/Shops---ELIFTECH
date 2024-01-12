import classes from './HomePage.module.css'
import backgroundImg  from '../static/image/background.svg'

const HomePage = () => {
    return <div className={classes.content}>
        <div className={classes.textBox}>
            <h1>The Shops Market</h1>
            <h2>This is project is use MERN project</h2>
        </div>
        <div className={classes.imgBox}>
            <img src={backgroundImg} alt=''></img>
        </div>
    </div>
}

export default HomePage;