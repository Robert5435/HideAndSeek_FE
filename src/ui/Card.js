import classes from "./Card.module.css";

function Card(props) {
  function clickHandler(){
    console.log("click")
  }
  return <div className={classes.card} onClick={props.onClick}>
      {props.children}
  </div>;
}

export default Card;