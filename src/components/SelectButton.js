import { makeStyles } from "@material-ui/core";

const SelectButton = ({ children, selected, onClick }) => {
  
  //estilos do MUI
  const useStyles = makeStyles({
    
    selectbutton: {
      border: "1px solid green",
      borderRadius: 5,
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
      fontFamily: "Montserrat",
      cursor: "pointer",
      backgroundColor: selected ? "green" : "",
      color: selected ? "black" : "",
      fontWeight: selected ? 700 : 500,
      "&:hover": {
        backgroundColor: "green",
        color: "black",
      },
      width: "22%",
      boxShadow:"1px 2px 1px green"
    },
  });

  const classes = useStyles(); //chamar os estilos criados

  return (
    <span onClick={onClick} className={classes.selectbutton}>
      {children}
    </span>
  );
};

export default SelectButton;