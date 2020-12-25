import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
} from 'reactstrap';
import { NavLink as RouterLink, useHistory } from 'react-router-dom';
import { useAuth } from '../contexts/auth';
import { FaShoppingCart } from 'react-icons/fa';
import { useCart } from '../contexts/cart';

const Appbar: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const { signOut, user } = useAuth();
  const { total, clearCart } = useCart();
  const history = useHistory();

  if (user?.store) {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">gFood - ADMIN</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/" exact tag={RouterLink}>
                Orders
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/users" tag={RouterLink}>
                Users
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/products" tag={RouterLink}>
                Products
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/stores" tag={RouterLink}>
                Stores
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/liststores" tag={RouterLink}>
                List Stores
              </NavLink>
            </NavItem>
          </Nav>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </Collapse>
      </Navbar>
    );
  } else {
    return (
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">gFood - CLIENT</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/liststores" tag={RouterLink}>
                List Stores
              </NavLink>
            </NavItem>
            <NavItem className="pull-right">
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  <FaShoppingCart
                    color="#FFF"
                    style={{ fontSize: 25, marginRight: 7 }}
                  />
                  {total}
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem onClick={() => history.push('/shopcart')}>
                    View Cart
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={() => clearCart()}>
                    Clear Cart
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </NavItem>
          </Nav>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </Collapse>
      </Navbar>
    );
  }
};

export default Appbar;
