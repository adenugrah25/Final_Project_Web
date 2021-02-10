import React from "react";
import Axios from "axios";
import {
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  CardMedia,
  TablePagination
} from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";

class ProductPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [],
      rowsPerPage: 5,
      page: 0
     };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/getAllProducts`)
      .then((res) => {
        // console.log(` products data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(`error get data in allProducts : `, err));
  }

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>Image</TableCell>
        <TableCell>ID-Product</TableCell>
        <TableCell>Product Name</TableCell>
        <TableCell>Product Category</TableCell>
        <TableCell>Price Modal</TableCell>
        <TableCell>Price Sell</TableCell>
        <TableCell>Stock</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    const {data, page, rowsPerPage} = this.state
    return data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>
            <CardMedia
              image={item.image}
              component="img"
              style={styles.contentImage}
            />
          </TableCell>
          <TableCell>{item.id_product}</TableCell>
          <TableCell>{item.product_name}</TableCell>
          <TableCell>{item.product_cate}</TableCell>
          <TableCell>IDR {item.price_modal.toLocaleString()}</TableCell>
          <TableCell>IDR {item.price_sell.toLocaleString()}</TableCell>
          <TableCell>{item.product_stock}</TableCell>
        </TableRow>
      );
    });
  };

  handleChangePage = (event, newPage) => {
    this.setState({page: newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage: parseInt(event.target.value, 10), page: 0});
  };

  render() {
    console.log(this.state.rowsPerPage)
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={{ padding: 15 }}>
          <h1>Products Info</h1>
          <Table>
            <TableHead>{this.renderTableHead()}</TableHead>
            <TableBody>{this.renderTableBody()}</TableBody>
          </Table>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component='div'
                  colSpan={8}
                  count={this.state.data.length}
                  rowsPerPage={this.state.rowsPerPage}
                  page={this.state.page}
                  onChangePage={this.handleChangePage}
                  onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  // ActionsComponent={TablePaginationActions}
                />
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
  contentImage: {
    maxWidth: 80,
    maxHeight: 80,
    padding: "5%",
    backgroundColor: "white",
    borderRadius: 20,
  },
};

export default ProductPage;
