import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
export default class NavBar extends React.Component {
  render() {
    const menuStyle = { marginBottom: '15px' };
    return (
      <Menu style={menuStyle} attached="top" borderless inverted>
        <Menu.Item as={NavLink} activeClassName="" exact to="/">
        </Menu.Item>
      </Menu>
    );
  }
}
