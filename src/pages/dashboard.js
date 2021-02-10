import React from "react";
import Axios from "axios";
import { Paper } from "@material-ui/core";
import Wallpaper from "../assets/images/Wallpaper.jpg";

class DashboardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      totProfit: 0,
      pkg: [],
      hover1: false,
      hover2: false,
      hover3: false
    };
  }

  async componentDidMount() {
    await Axios.get(`http://localhost:2000/users`)
      .then((res) => {
        this.setState({ users: res.data });
      })
      .catch((err) => console.log(err));

    await Axios.get(`http://localhost:2000/totalSalesReport`)
      .then((res) => {
        this.setState({ totProfit: res.data.total_profit });
      })
      .catch((err) => console.log(err));

    await Axios.get(`http://localhost:2000/highestPkgSold`)
      .then((res) => {
        this.setState({ pkg: res.data });
      })
      .catch((err) => console.log(err));
  }

  hoverHandler1 = async () => {
    await this.setState({ hover1: !this.state.hover1})
  }

  hoverHandler2 = async () => {
    await this.setState({ hover2: !this.state.hover2})
  }

  hoverHandler3 = async () => {
    await this.setState({ hover3: !this.state.hover3})
  }

  render() {
    const { users, totProfit, pkg, hover1, hover2, hover3 } = this.state;
    console.log(users);
    console.log(totProfit);
    console.log(pkg);
    return (
      <div style={styles.root}>
        <Paper elevation={3} style={styles.paper}>
          <h1>Dashboard Page</h1>
          <div style={styles.parContent}>
            <Paper
              elevation={hover1 ? 10 : 3}
              style={hover1 ? styles.contentHover : styles.content}
              onMouseEnter={this.hoverHandler1}
              onMouseLeave={this.hoverHandler1}
            >
              <h3>Total Profit:</h3>
              <h2>IDR {totProfit.toLocaleString()}</h2>
            </Paper>
            <Paper
              elevation={hover2 ? 10 : 3}
              style={hover2 ? styles.contentHover : styles.content}
              onMouseEnter={this.hoverHandler2}
              onMouseLeave={this.hoverHandler2}
              >
              <h3>Package Best Seller:</h3>
              <h2>{pkg.package_name}</h2>
              <h3>({pkg.total} package)</h3>
            </Paper>
            <Paper
              elevation={hover3 ? 10 : 3}
              style={hover3 ? styles.contentHover : styles.content}
              onMouseEnter={this.hoverHandler3}
              onMouseLeave={this.hoverHandler3}
            >
              <h3>Total Users:</h3>
              <h2>{users.length} Users</h2>
            </Paper>
          </div>
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
    paddingRight: "7vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  paper: {
    height: "55vh",
    width: "70vw",
    padding: 15,
  },
  content: {
    height: 200,
    width: 200,
    borderRadius: "50%",
    display: "flex",
    transition: ".3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    textAlign: "center",
    backgroundColor: "#baddf9"
  },
  contentHover: {
    height: 250,
    width: 250,
    borderRadius: "50%",
    display: "flex",
    transition: ".3s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "1%",
    textAlign: "center",
    backgroundColor: "#baddf9"
  },
  parContent: {
    height: "85%",
    display: "flex",
    // backgroundColor: "black",
    justifyContent: "space-around",
    alignItems: "center",
  },
};

export default DashboardPage;
