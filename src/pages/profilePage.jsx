// import component
import React, { Component } from "react";
import Axios from "axios";
import { connect } from "react-redux";
import {
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  InputAdornment,
  IconButton,
  Typography,
} from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";
import wallpaper2 from "../assets/images/wallpaper2.jpg";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { URL_IMG, upload, KeepLogin, URL } from "../actions";

import avatar from "../assets/no-profile.jpg";

class ProfilePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      openEditAdress: false,
      openEditPass: false,
      edit: false,
      errorPassword: false,
      errorPasswordMessage: "",
      showPassword: false,
      errorMsg: "",
      data: [],
    };
  }

  handleChoose = (e) => {
    console.log("event : ", e.target.files);
    this.setState({ image: e.target.files[0] }, () =>
      console.log("image : ", this.state.image)
    );
  };

  handleUpload = async () => {
    console.log("image : ", this.state.image);

    // create formdata
    const data = new FormData();
    data.append("IMG", this.state.image);
    // data.append('filename', 'gambar profile')
    console.log("form data : ", data.get("IMG"));

    await this.props.upload(data);
    await this.setState({ image: null });
  };

  handleClick = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickOpenEditPass = () => {
    this.setState({ openEditPass: true });
  };

  handleCloseEditPass = () => {
    this.setState({ openEditPass: false });
  };

  handleClickOpenEditAddress = () => {
    this.setState({ openEditAdress: true });
  };

  handleCloseEditAdress = () => {
    this.setState({ openEditAdress: false });
  };

  handleSaveEditedAddress = () => {
    if (this.newaddress.value === "") return console.log("Empty Input");
    const newaddress = this.newaddress.value;
    const body = {
      address: newaddress,
    };

    Axios.patch(URL + "/editaddress/" + localStorage.getItem("id"), body)
      .then((res) => {
        console.log(`edit address data : `, res.data);
        this.setState({ data: res.data });
        this.props.KeepLogin();
        this.setState({ openEditAdress: false });
      })
      .catch((error) => {
        console.log(`error edit address : `, error);
      });
    // console.log(body)
  };

  handleSaveEditedPassword = () => {
    if (
      !this.oldpass.value ||
      !this.newpass.value ||
      !this.confpass.value === ""
    )
      return console.log("Empty Password");

    const body = {
      oldpass: this.oldpass.value,
      newpass: this.newpass.value,
      confpass: this.confpass.value,
    };
    console.log(body);

    Axios.patch(URL + "/editpass/" + localStorage.getItem("id"), body)
      .then((res) => {
        console.log(` edit pass data : `, res.data);
        this.setState({ data: res.data });
        this.props.KeepLogin();
        this.setState({ openEditPass: false });
      })
      .catch((error) => {
        console.log(
          `error edit password : `,
          error.response ? error.response.data : error
        );
        this.setState({ errorMsg: error.response.data });
      });
  };

  render() {
    const { picture } = this.props;
    // const { picture, address, edit } = this.props;
    // const { image } = this.props;
    
    console.log(`username : `, this.props.username);
    console.log(`email : `, this.props.email);
    console.log(`address : `, this.props.address);

    return (
      <div style={styles.root}>
        <Paper style={styles.profilebox} elevation={3}>
          <div style={styles.avatar}>
            <img
              src={picture ? URL_IMG + picture : avatar}
              height="100%"
              width="100%"
              alt="profile-img"
            />
          </div>
          <div style={styles.buttonprofile}>
            <form
              encType="multipart/form-data"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                type="file"
                accept="image/*"
                name="IMG"
                onChange={(e) => this.handleChoose(e)}
              />
            </form>
            <Button
              onClick={this.handleUpload}
              variant="contained"
              color="black"
              style={{
                backgroundColor: "#cbe2d6",
                borderRadius: 20,
                marginTop: 5,
              }}
            >
              Upload
            </Button>
            {/* <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: "5px" }}
            >
              Delete
            </Button> */}
          </div>
          <div style={styles.disablemail}>
            <TextField
              disabled
              id="outlined-disabled"
              label="EMAIL"
              value={this.props.email}
              variant="outlined"
            />
          </div>
          <div style={styles.addressdialog}>
            <Typography>ADDRESS</Typography>
            <div>
              <Button
                variant="outlined"
                color="BLACK"
                onClick={this.handleClickOpenEditAddress}
                style={{
                  backgroundColor: "#cbe2d6",
                  borderRadius: 20,
                  marginTop: 5,
                }}
              >
                Edit Address
              </Button>
              <Dialog
                open={this.state.openEditAdress}
                onClose={this.handleCloseEditAdress}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change the address
                </DialogTitle>
                <DialogContent
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <DialogContentText>
                    Please enter your new address.
                  </DialogContentText>
                  <TextField
                    id="outlined-multiline-static"
                    label="Your Old Address"
                    multiline
                    rows={4}
                    value={this.props.address}
                    variant="outlined"
                  />
                  <TextField
                    style={{ marginTop: 10 }}
                    id="outlined-multiline-static"
                    label="Your New Address"
                    multiline
                    rows={4}
                    placeholder="Input your new address here...."
                    variant="outlined"
                    inputRef={(newaddress) => (this.newaddress = newaddress)}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseEditAdress} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={this.handleSaveEditedAddress}
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
          <div style={styles.passdialog}>
            <Typography>PASSWORD</Typography>
            <div>
              <Button
                variant="outlined"
                color="black"
                onClick={this.handleClickOpenEditPass}
                style={{
                  backgroundColor: "#cbe2d6",
                  borderRadius: 20,
                  marginTop: 5,
                }}
              >
                Edit Password
              </Button>
              <Dialog
                open={this.state.openEditPass}
                onClose={this.handleCloseEditPass}
                aria-labelledby="form-dialog-title"
              >
                <DialogTitle id="form-dialog-title">
                  Change the password
                </DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Please enter your password.
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Password"
                    type={this.state.showPassword ? "text" : "password"}
                    inputRef={(oldpass) => (this.oldpass = oldpass)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => this.handleClick()}>
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="New-password"
                    type={this.state.showPassword ? "text" : "password"}
                    inputRef={(newpass) => (this.newpass = newpass)}
                    fullWidth
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => this.handleClick()}>
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                  <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Confirm New-password"
                    type={this.state.showPassword ? "text" : "password"}
                    inputRef={(confpass) => (this.confpass = confpass)}
                    fullWidth
                    helperText={this.state.errorMsg ? this.state.errorMsg : ""}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => this.handleClick()}>
                            {this.state.showPassword ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseEditPass} color="primary">
                    Cancel
                  </Button>
                  <Button
                    onClick={this.handleSaveEditedPassword}
                    color="primary"
                  >
                    Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const styles = {
  root: {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50px",
    backgroundImage: `url(${Wallpaper})`,
  },
  profilebox: {
    width: "30vw",
    height: "80vh",
    // backgroundColor: "#f2f2f2",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "2% 5%",
    backgroundImage: `url(${wallpaper2})`,
  },
  addressdialog: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },
  passdialog: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
    marginBottom: 5,
  },
  avatar: {
    backgroundColor: "salmon",
    height: "150px",
    width: "150px",
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonprofile: {
    marginBottom: "2%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  disablemail: {
    width: "100%",
    height: "30",
    marginTop: "2%",
    marginBottom: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
};

const mapStateToProps = (state) => {
  console.log(`state profile page: `, state.userReducer);
  return {
    username: state.userReducer.username,
    email: state.userReducer.email,
    address: state.userReducer.address,
    errorMsg: state.userReducer.errorMsg,
    picture: state.userReducer.picture,
  };
};

export default connect(mapStateToProps, { upload, KeepLogin })(ProfilePage);
