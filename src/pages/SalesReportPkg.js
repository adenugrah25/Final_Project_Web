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

class SalesReportPkg extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      package: [],
    };
  }

  async componentDidMount() {
    await Axios.get(`http://localhost:2000/salesreppkg`)
      .then((res) => {
        // console.log(` products data : `, res.data);
        this.setState({ package: res.data });
      })
      .catch((err) => console.log(err));
  }

  renderTableHeadPkg = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Username</TableCell>
        <TableCell>Order Number</TableCell>
        <TableCell>Package Name</TableCell>
        <TableCell>Total Modal</TableCell>
        <TableCell>Package Price</TableCell>
        <TableCell>Profit</TableCell>
      </TableRow>
    );
  };

  renderTableBodyPkg = () => {
    return this.state.package.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>{item.username}</TableCell>
          <TableCell>{item.order_number}</TableCell>
          <TableCell>{item.package_name}</TableCell>
          <TableCell>IDR {item.total_modal.toLocaleString()}</TableCell>
          <TableCell>IDR {item.package_price.toLocaleString()}</TableCell>
          <TableCell>IDR {item.profit.toLocaleString()}</TableCell>
        </TableRow>
      );
    });
  };

  render() {
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={styles.paper}>
          <h1>Sales Report Package</h1>
          <Table>
            <TableHead>{this.renderTableHeadPkg()}</TableHead>
            <TableBody>{this.renderTableBodyPkg()}</TableBody>
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

export default SalesReportPkg;
