import React from 'react';
import {inject, observer} from 'mobx-react';
import {observable} from "mobx";
import {
    Collapse,
    DropdownItem,
    NavbarToggler,
    Nav,
    NavItem,
    DropdownMenu,
    Navbar,
    DropdownToggle,
    UncontrolledDropdown, NavbarBrand,
} from "reactstrap";
import {withRouter, Link} from "react-router-dom";
import {t, changeLanguage} from "./Translator";
import logo from './logo.svg'


@withRouter @inject('store') @observer
class TopMenu extends React.Component {
    @observable address = '';
    @observable balance = 0;

    constructor(props) {
        super(props);
        this.store = props.store;
        this.state = {
            collapsed: true
        };
        document.title = 'Minter Daily';
    }

    navItem = (item) => {

        //const active =  !!this.props.location.pathname.match(item.path);
        const active = this.props.location.pathname === item.path;
        return item.show &&
            <NavItem key={'nav-' + item.path} active={active}>
                <Link to={item.path} className={'nav-link'}>{item.label}</Link>
            </NavItem>
    };

    render() {
        const menuItems = [
            {path: '/', label: t('Home'), show: true},
            {path: '/winners', label: t('Winners'), show: true},
            {path: '/promos', label: t('Valid promo-codes'), show: true},
        ];
        return (
            <Navbar color="dark" dark expand="md">
                <NavbarBrand href='javascript:void(0)' onClick={e => this.props.history.push('/')} className='mr-auto'><img src={logo} alt={'logo'}/> {t('projectName')}</NavbarBrand>
                <NavbarToggler onClick={this.toggle}/>
                <Collapse isOpen={true} navbar>
                    <Nav className="ml-auto" navbar>
                        {menuItems.map(this.navItem)}
                        {/*<UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>
                                {t('Language')}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick={() => changeLanguage('ru')}>
                                    RU
                                </DropdownItem>
                                <DropdownItem onClick={() => changeLanguage('en')}>
                                    EN
                                </DropdownItem>

                            </DropdownMenu>
                        </UncontrolledDropdown>*/}
                    </Nav>
                </Collapse>
            </Navbar>
        );
    }
}

export default TopMenu;