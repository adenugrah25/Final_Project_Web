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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Typography,
  InputAdornment,
  Select,
} from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";
import DialogDetails from "../components/dialogDetails";
import DeleteIcon from "@material-ui/icons/Delete";
import AddBoxIcon from "@material-ui/icons/AddBox";
import {URL, URL_IMG} from '../actions'

class PackagePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      openAddPkgButton: false,
      selectedQuantity: 0,
      openDialogDelete: false,
      productName: [],
      catlvlthree: [],
      selectedCategory: "cate",
      newListPkgDetails: [],
      image: null,
    };
  }

  componentDidMount() {
    Axios.get(`http://localhost:2000/getAllPackages`)
      .then((res) => {
        // console.log(` packages data : `, res.data);
        this.setState({ data: res.data });
      })
      .catch((err) => console.log(`error get data in allPackages : `, err));

    Axios.get(`http://localhost:2000/getLvl3Cate`)
      .then((resp) => {
        // console.log(`Level 3 Category : `, resp.data);
        this.setState({ catlvlthree: resp.data });
      })
      .catch((error) => console.log(`error get catlevelthree : `, error));
  }

  handleChoose = (e) => {
    console.log("event : ", e.target.files);
    this.setState({ image: e.target.files[0] }, () =>
      console.log("image : ", this.state.image)
    );
  };

  handleSaveNewPackage = () => {
    const package_name = this.newPkgName.value;
    const description = this.newPkgDesc.value;
    const details = [...this.state.newListPkgDetails];
    details.forEach((element) => {
      const id = this.state.catlvlthree.findIndex(
        (item) => item.category === element.category
      );
      element.category_id = this.state.catlvlthree[id].id_category;
      delete element.category;
    });
    const package_price = this.newPkgPrice.value;
    const body = { package_name, description, details, package_price };
    console.log(body);

    // create formdata
    const data = new FormData();
    data.append("IMG", this.state.image);
    // data.append('filename', 'gambar profile')
    console.log("form data : ", data.get("IMG"));
    const option = { headers: { "Content-Type": "multipart/form-data" } };

    Axios.post(URL + '/addNewPackage', body)
    .then((res) => {
      Axios.post(URL + '/postImgPkg/' + res.data.id_package, data, option)
      .then((res) => {
        this.setState({ openAddPkgButton: false, newListPkgDetails: [], image: null })
      })
    })
    .catch(err => console.log(err))
  };

  handleAddToList = () => {
    const category = this.state.selectedCategory;
    const max_qty = this.newPkgQty.value;

    const body = { category, max_qty };
    console.log("addtolist : ", body);

    let temp = [...this.state.newListPkgDetails];
    temp.push(body);
    this.setState({ newListPkgDetails: temp });

    this.setState({selectedCategory : "cate"});
    this.newPkgQty.value = 0;
  };

  handleClickOpenDialogDelete = () => {
    this.setState({ openDialogDelete: true });
    console.log(`open dialog delete`);
  };

  handleCloseDialogDelete = () => {
    this.setState({ openDialogDelete: false });
  };

  handleOpenAddPkgButton = () => {
    this.setState({ openAddPkgButton: true });
  };

  handleCloseAddPkgButton = () => {
    this.setState({
      openAddPkgButton: false,
      selectedCategory: "",
      newListPkgDetails: [],
    });
  };

  renderTableHead = () => {
    return (
      <TableRow>
        <TableCell>No</TableCell>
        <TableCell>Image</TableCell>
        <TableCell>Package Name </TableCell>
        <TableCell>Package Details</TableCell>
        <TableCell>Package Price</TableCell>
        <TableCell>Action</TableCell>
      </TableRow>
    );
  };

  renderTableBody = () => {
    return this.state.data.map((item, index) => {
      return (
        <TableRow key={index}>
          <TableCell>{index + 1}</TableCell>
          <TableCell>
            <CardMedia
              image={URL_IMG + item.img}
              component="img"
              style={styles.contentImage}
              alt='package-img'
            />
          </TableCell>
          <TableCell>{item.package_name}</TableCell>
          <TableCell>
            <DialogDetails detail={item.details} />
          </TableCell>
          <TableCell>IDR {item.package_price.toLocaleString()}</TableCell>
          <TableCell>
            <Button
              variant="contained"
              color="secondary"
              onClick={this.handleClickOpenDialogDelete}
              // className={}
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
            <Dialog
              open={this.state.openDialogDelete}
              onClose={this.handleCloseDialogDelete}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Do yo want to delete this package?"}
              </DialogTitle>
              <DialogActions>
                <Button onClick={this.handleCloseDialogDelete} color="primary">
                  No
                </Button>
                <Button
                  onClick={this.handleCloseDialogDelete}
                  color="primary"
                  autoFocus
                >
                  Yes
                </Button>
              </DialogActions>
            </Dialog>
          </TableCell>
        </TableRow>
      );
    });
  };

  render() {
    // const { selectedQuantity } = this.state;
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={{ padding: 15 }}>
          <div style={styles.packageinfoandadd}>
            <h1>Packages Info</h1>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              onClick={this.handleOpenAddPkgButton}
              style={{
                backgroundColor: "#cbe2d6",
                color: "black",
                borderRadius: 20,
                marginRight: 20,
              }}
              // className={classes.button}
              startIcon={<AddBoxIcon />}
            >
              Add Package
            </Button>
            <Dialog
              open={this.state.openAddPkgButton}
              onClose={this.handleCloseAddPkgButton}
              style={{ display: "flex", flexDirection: "column" }}
              maxWidth="lg"
            >
              <DialogTitle id="form-dialog-title">
                Input the New Details Package
              </DialogTitle>
              <DialogContent style={{}}>
                <Table style={{ width: "40%" }}>
                  <TableBody>
                    <TableRow>
                      <TableCell>Image</TableCell>
                      <TableCell>
                        <div style={styles.pkgimg}>
                          <form encType="multipart/form-data">
                            <input
                              type="file"
                              accept="image/*"
                              name="IMG"
                              onChange={(e) => this.handleChoose(e)}
                            />
                          </form>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Package Name</TableCell>
                      <TableCell>
                        <div style={styles.pkgname}>
                          <TextField
                            id="outlined-textarea"
                            label="Package Name"
                            variant="outlined"
                            inputRef={(newPkgName) =>
                              (this.newPkgName = newPkgName)
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Package Description</TableCell>
                      <TableCell>
                        <div style={styles.pkgname}>
                          <TextField
                            id="outlined-textarea2"
                            label="Package Description"
                            variant="outlined"
                            inputRef={(newPkgDesc) =>
                              (this.newPkgDesc = newPkgDesc)
                            }
                          />
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Package Details</TableCell>
                      <TableCell>
                        <div style={styles.catpkg}>
                          <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            onChange={(e) => {
                              this.setState({
                                selectedCategory: e.target.value,
                              });
                            }}
                            label="Category Package"
                            value={this.state.selectedCategory}
                          >
                            <MenuItem value="cate">Category</MenuItem>
                            {this.state.catlvlthree.map((item, index) => {
                              return (
                                <MenuItem key={index} value={item.category}>
                                  {item.category}
                                </MenuItem>
                              );
                            })}
                          </Select>
                          <TextField
                            id="standard-number"
                            label="Quantity"
                            type="number"
                            defaultValue="0"
                            inputRef={(newPkgQty) =>
                              (this.newPkgQty = newPkgQty)
                            }
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <Button
                            variant="contained"
                            style={{
                              backgroundColor: "#cbe2d6",
                              borderRadius: 20,
                              marginRight: 20,
                            }}
                            onClick={this.handleAddToList}
                          >
                            Add to List
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Selected Category</TableCell>
                      <TableCell>
                        <div style={styles.disableBox}>
                          <Typography>List Package Details</Typography>
                          <div style={{ marginLeft: 15 }}>
                            <ul>
                              {this.state.newListPkgDetails.map(
                                (item, index) => {
                                  return (
                                    <li key={index}>
                                      Category Name : {item.category}, Quantity
                                      : {item.max_qty}
                                    </li>
                                  );
                                }
                              )}
                            </ul>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Price</TableCell>
                      <TableCell>
                        <TextField
                          label="Package Price"
                          id="outlined-start-adornment"
                          defaultValue="0"
                          type="number"
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                Rp
                              </InputAdornment>
                            ),
                          }}
                          variant="outlined"
                          inputRef={(newPkgPrice) =>
                            (this.newPkgPrice = newPkgPrice)
                          }
                        />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={this.handleCloseAddPkgButton}
                  color="secondary"
                >
                  Cancel
                </Button>
                <Button onClick={this.handleSaveNewPackage} color="primary">
                  Submit
                </Button>
              </DialogActions>
            </Dialog>
          </div>
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
    backgroundImage: `url(${Wallpaper})`,
    display: "flex",
    flexDirection: "column",
    paddingLeft: "18vw",
    paddingTop: "5vh",
    paddingRight: "5vw",
  },
  pkgimg: {
    margin: 5,
    display: "flex",
    flexDirection: "row",
    width: 40,
  },
  pgkprice: {
    marginTop: 5,
  },
  pkgname: {
    marginBottom: 5,
    marginTop: 0,
  },
  catpkg: {
    width: 600,
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  buttonplusminus: {
    marginTop: 5,
    justifyContent: "space-between",
  },
  contentImage: {
    maxWidth: 100,
    maxHeight: 100,
    padding: "5%",
    backgroundColor: "white",
    borderRadius: 20,
  },
  packageinfoandadd: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  disableBox: {
    borderRadius: 10,
    borderStyle: "solid",
    borderWidth: 1,
    padding: 10,
  },
};

export default PackagePage;
