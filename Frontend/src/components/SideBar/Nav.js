import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';


class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    return (
      <ul className="nav">
        <li className={location.pathname === '/' ? 'active' : null}>
          <Link to="/">
            <i className="pe-7s-graph"></i>
            <p>Overview</p>
          </Link>
        </li>
        <li className={this.isPathActive('/ingress-egress') || this.state.componentMenuOpen ? 'active' : null}>
          <Link to="/ingress-egress">
          <i className="pe-7s-plugin"></i>
          <p>
            Ingress/Egress
          </p>
          </Link>
        </li>
        <li className={this.isPathActive('/world') || this.state.mapMenuOpen ? 'active' : null}>
            <Link to="/world">
            <i className="pe-7s-map-marker"></i>
            <p>Map</p>
            </Link>
        </li>
        <li className={this.isPathActive('/domain') ? 'active' : null}>
          <Link to="/domain">
            <i className="pe-7s-date"></i>
            <p>Domain</p>
          </Link>
        </li>
        <li className={this.isPathActive('/forms') || this.state.formMenuOpen ? 'active' : null}>
            <Link to="/forms">
            <i className="pe-7s-note2"></i>
            <p>Forms</p>
            </Link>
        </li>
        <li className={this.isPathActive('/tables') || this.state.tableMenuOpen ? 'active' : null}>
          <a onClick={() => this.setState({ tableMenuOpen: !this.state.tableMenuOpen })} data-toggle="collapse">
            <i className="pe-7s-news-paper"></i>
            <p>Tables <b className="caret"></b></p>
          </a>
          <Collapse in={this.state.tableMenuOpen}>
            <div>
              <ul className="nav">
                <li className={this.isPathActive('/tables/regular-tables') ? 'active' : null}>
                  <Link to="/tables/regular-tables">Regular Table</Link>
                </li>
                <li className={this.isPathActive('/tables/extended-tables') ? 'active' : null}>
                  <Link to="/tables/extended-tables">Extended Tables</Link>
                </li>
                <li className={this.isPathActive('/tables/fixed-data-table') ? 'active' : null}>
                  <Link to="/tables/react-bootstrap-table">React Bootstrap Table</Link>
                </li>
              </ul>
            </div>
          </Collapse>
        </li>
        <li className={this.isPathActive('/charts') ? 'active' : null}>
          <Link to="/charts">
            <i className="pe-7s-graph"></i>
            <p>Charts</p>
          </Link>
        </li>
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);