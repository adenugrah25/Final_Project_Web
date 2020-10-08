import React from "react";
import Axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CancelIcon from '@material-ui/icons/Cancel';
import Wallpaper from "../assets/images/Wallpaper.jpg";
import {URL_IMG} from '../actions'

class HistoryTrans extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    this.getData()
  }

  getData = () => {
    Axios.get(`http://localhost:2000/transhistory`)
    .then((res) => {
      // console.log(`data : `, res.data);
      this.setState({ data: res.data });
    })
    .catch((err) => console.log(err));
  }

  approvePayment = async (on) => {
      console.log('approve : ', on)
      await Axios.patch(`http://localhost:2000/approvalpayment/${on}`)
      .then((res) => {
        // console.log(`data : `, res.data);
        this.getData()
      })
      .catch((err) => console.log(err));
  }

  cancelPayment = async (on) => {
      // console.log('cancel : ', on)
      await Axios.patch(`http://localhost:2000/cancelpayment/${on}`)
      .then((res) => {
        // console.log(`data : `, res.data);
        this.getData()
      })
      .catch((err) => console.log(err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Order Number</TableCell>
        <TableCell>Payment Date</TableCell>
        <TableCell>Via Bank</TableCell>
        <TableCell>Amount</TableCell>
        <TableCell>Transaction Receipt</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.data.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.order_number}</TableCell>
          <TableCell>{item.payment_date}</TableCell>
          <TableCell>{item.via_bank}</TableCell>
          <TableCell>IDR {item.amount.toLocaleString()}</TableCell>
          <TableCell>
            {
              item.transaction_receipt ? <img src={ URL_IMG + item.transaction_receipt} style={{width: 100}} alt="payment-img"
              /> : null
            }
          </TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>
              {
                parseInt(item.payment_status_id) === 1
                ? 
                <div>
                    <Button onClick={() => this.approvePayment(item.order_number)}><CheckCircleIcon style={{color: 'lime'}} /></Button>
                    <Button onClick={() => this.cancelPayment(item.order_number)}><CancelIcon style={{color: '#FC1A04'}}/></Button>
                </div>
                :
                <div></div>
              }
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={{padding: 15}}>
          <h1>Transaction Info</h1>
          <Table>
            <TableHead>{this.renderTableHead()}</TableHead>
            <TableBody>{this.renderTableBody()}</TableBody>
          </Table>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    height: "auto",
    minHeight: "100vh",
    width: "100vw",
    backgroundImage: `url(${Wallpaper})`,
    display: "flex",
    flexDirection: "column",
    paddingLeft: "18vw",
    paddingTop: "5vh",
    paddingRight: "5vw",
  },
};

export default HistoryTrans;
