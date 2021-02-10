import React from "react";
import Axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
} from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";

class SalesReportTrans extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      salesReport: [],
    };
  }

  async componentDidMount() {
    await Axios.get(`http://localhost:2000/salesreport`)
      .then((res) => {
        // console.log(` products data : `, res.data);
        this.setState({ salesReport: res.data });
      })
      .catch((err) => console.log(err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Order Number</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Total Modal</TableCell>
        <TableCell>Total Sell</TableCell>
        <TableCell>Profit</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.salesReport.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.order_number}</TableCell>
          <TableCell>{item.status}</TableCell>
          <TableCell>IDR {item.total_modal.toLocaleString()}</TableCell>
          <TableCell>IDR {item.total_sell.toLocaleString()}</TableCell>
          <TableCell>IDR {item.profit.toLocaleString()}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={styles.paper}>
          <h1>Sales Report per Transaction</h1>
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
  paper: {
    padding: 15,
  },
};

export default SalesReportTrans;
