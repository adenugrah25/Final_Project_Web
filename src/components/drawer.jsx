import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Drawer from "@material-ui/core/Drawer";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import AccountBalanceWalletIcon from "@material-ui/icons/AccountBalanceWallet";
import DashboardIcon from "@material-ui/icons/Dashboard";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";

import { LogOut } from "../actions/userAction";

// class component
class DrawerComp extends React.Component {
  handleLogOut = () => {
    this.props.LogOut();
  };

  render() {
    return (
      <div style={styles.root}>
        <Drawer
          //   style={styles.drawer}
          variant="permanent"
        >
          <Toolbar />
          <div style={styles.drawerContainer}>
            <Link to="/dashboard" style={{ textDecoration: "none" }}>
              <List
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem button key={"Dashboard"}>
                  <ListItemIcon>
                    <DashboardIcon style={{ color: "#91B1D6" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Dashboard"}
                    style={{ color: "black" }}
                  />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <List>
              <Accordion square={true} elevation={0}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <MonetizationOnIcon
                    style={{ color: "#91B1D6", marginRight: 30 }}
                  />
                  <Typography>Sales Report</Typography>
                </AccordionSummary>
                <AccordionDetails
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                  }}
                >
                  <Link
                    to="/salesReportTrans"
                    style={{ textDecoration: "none" }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "black"
                      }}
                    >
                      <Typography>
                        Transaction
                      </Typography>
                      <ArrowForwardIcon style={{marginLeft: 10, color: "#91B1D6"}} />
                    </div>
                  </Link>
                  <Link
                    to="/salesReportPkg"
                    style={{ textDecoration: "none", marginTop: 10 }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        color: "black"
                      }}
                    >
                      <Typography>
                        Sold Package
                      </Typography>
                      <ArrowForwardIcon style={{marginLeft: 10, color: "#91B1D6"}} />
                    </div>
                  </Link>
                </AccordionDetails>
              </Accordion>
            </List>
            <Divider />
            <Link to="/userInfo" style={{ textDecoration: "none" }}>
              <List
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem button key={"Users"}>
                  <ListItemIcon>
                    <AccountCircleIcon style={{ color: "#91B1D6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"Users"} style={{ color: "black" }} />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <Link to="/productPage" style={{ textDecoration: "none" }}>
              <List
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem button key={"Product"}>
                  <ListItemIcon>
                    <FormatListBulletedIcon style={{ color: "#91B1D6" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Product"}
                    style={{ color: "black" }}
                  />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <Link to="/packagePage" style={{ textDecoration: "none" }}>
              <List
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem button key={"Packages"}>
                  <ListItemIcon>
                    <CardGiftcardIcon style={{ color: "#91B1D6" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Packages"}
                    style={{ color: "black" }}
                  />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <Link to="/historyTrans" style={{ textDecoration: "none" }}>
              <List
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem button key={"Payment"}>
                  <ListItemIcon>
                    <AccountBalanceWalletIcon style={{ color: "#91B1D6" }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={"Payment"}
                    style={{ color: "black" }}
                  />
                </ListItem>
              </List>
            </Link>
            <Divider />
            <Link to="/" style={{ textDecoration: "none" }}>
              <List
                onClick={this.handleLogOut}
                style={{
                  height: 60,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ListItem button key={"LogOut"}>
                  <ListItemIcon>
                    <MeetingRoomIcon style={{ color: "#91B1D6" }} />
                  </ListItemIcon>
                  <ListItemText primary={"LogOut"} style={{ color: "black" }} />
                </ListItem>
              </List>
            </Link>
            <Divider />
          </div>
        </Drawer>
      </div>
    );
  }
}

const styles = {
  root: {
    display: "flex",
  },
  drawer: {
    width: 300,
    flexShrink: 0,
    backgroundColor: "salmon",
  },
  drawerPaper: {
    width: 300,
  },
  drawerContainer: {
    overflow: "auto",
  },
  content: {
    flexGrow: 1,
  },
};

export default connect(null, { LogOut })(DrawerComp);
