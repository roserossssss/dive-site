import style from "./card.module.css"
import { MdSupervisedUserCircle } from "react-icons/md"

export default function Card() {

    return (
        <div className={style.container}>
                <MdSupervisedUserCircle size={24}/>
                <div className={style.texts}>
                    <span className={style.number}></span>
                    <span></span>
                </div>
        </div>
    )

}