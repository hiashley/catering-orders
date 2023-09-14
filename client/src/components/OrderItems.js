import { styled } from "@mui/material/styles";
import styles from "./AccordionItem.module.css"
import { Button, FormControl, InputLabel } from "@mui/material";
import { Link } from "react-router-dom";

// const Accordion = styled((props) => (
//   <MuiAccordion disableGutters elevation={0} square {...props} />
// ))(({ theme }) => ({
//   border: `1px solid ${theme.palette.divider}`,
//   "&:not(:last-child)": {
//     borderBottom: 0,
//   },
//   "&:before": {
//     display: "none",
//   },
// }));

// const AccordionSummary = styled((props) => (
//   <MuiAccordionSummary
//     // expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
//     {...props}
//   />
// ))(({ theme }) => ({
//   backgroundColor:
//     theme.palette.mode === "dark"
//       ? "rgba(255, 255, 255)"
//       : "rgba(0, 0, 0, .005)",
//   flexDirection: "row",
//   "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
//     transform: "rotate(180deg)",
//   },
//   "& .MuiAccordionSummary-content": {
//     marginLeft: theme.spacing(1),
//   },
// }));

// const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
//   padding: theme.spacing(2),
//   borderTop: "1px solid rgba(0, 0, 0, .125)",
// }));

export default function OrderItems(data) {
  return (
    <div className={styles.container}>

        <div className={styles.orderItem}>
          <div>
            <p>Order ID:</p>
            <p className={styles.posId}>{data.orderId}</p>
          </div> 
          <div className={styles.orderName}>
            <p>Name:</p>
            <p><b>{data.firstName}&nbsp;{data.lastName}</b></p>
          </div>
         <div>
          <p>Date Ordered:</p>
          <p>{data.orderDate}</p> 
         </div>
         <div>
          <p>Required By:</p>
          <p>{data.requiredBy}</p> 
         </div>
         <div>
          <p>Total:</p>
          <p>${data.orderTotal}</p> 
         </div>
         <Button variant="contained" className={styles.orderButton}><Link to="#" className={styles.orderDetails}>Order Details</Link></Button>
        </div>
   

    </div>
  );
}
