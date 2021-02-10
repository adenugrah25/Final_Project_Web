// import Component
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { KeepLogin } from './actions'

// import component
import Drawer from './components/drawer'
import NavigationBar from './components/navigationBar'
import Footer from './components/footer'

// import pages
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage'
import RegisterPage from './pages/registerPage'
import ProfilePage from './pages/profilePage'
import CartPage from './pages/cartPage'
import ProductPackageDetails from './pages/productPackageDetails'
import ProductDetails from './pages/productDetails'
import HistoryUser from './pages/historyUser'
import HistoryTransaction from './pages/historyTransaction'
import UserInfo from './pages/userInfo'
import ProductPage from './pages/productPage'
import PackagePage from './pages/packagePage';
import DashboardPage from './pages/dashboard'
import SalesReportTrans from './pages/SalesReportTrans'
import SalesReportPkg from './pages/SalesReportPkg'
import NotFound from './pages/404';

class App extends Component {

    componentDidMount() {
        this.props.KeepLogin()
    }

    render() {
        if (this.props.role === 'admin') {
            return (
                <div>
                    <Drawer/>
                    <Switch>
                        <Route path='/dashboard' component={DashboardPage} exact/>
                        <Route path='/login' component={LoginPage} />
                        <Route path='/salesReportTrans' component={SalesReportTrans}/>
                        <Route path='/salesReportPkg' component={SalesReportPkg}/>
                        <Route path='/userInfo' component={UserInfo}/>
                        <Route path='/productPage' component={ProductPage}/>
                        <Route path='/packagePage' component={PackagePage}/>
                        <Route path='/historyTrans' component={HistoryTransaction}/>
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            )
        } else {
            return (
                <div>
                    <NavigationBar />
                    <Switch>
                        <Route path='/' component={HomePage} exact />
                        <Route path='/login' component={LoginPage} />
                        <Route path='/register' component={RegisterPage} />
                        <Route path='/profile' component={ProfilePage} />
                        <Route path="/historyUser" component={HistoryUser} />
                        <Route path='/productDetails' component={ProductDetails} />
                        <Route path='/productPackageDetails' component={ProductPackageDetails} />
                        <Route path='/cart' component={CartPage} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                    <Footer />
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => {
    return {
        role: state.userReducer.role
    }
}

export default connect(mapStateToProps, { KeepLogin })(App)