import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FavoriteActions } from "../../store/ducks/favorites";

class Main extends Component {
  static propTypes = {
    addFavoriteRequest: PropTypes.func.isRequired,
    favorites: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      data: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.number,
          name: PropTypes.string,
          description: PropTypes.string,
          url: PropTypes.string
        })
      ),
      error: PropTypes.oneOf([null, PropTypes.string])
    })
  };

  state = {
    repositoryInput: ""
  };

  handleAddRepository = ev => {
    ev.preventDefault();
    this.props.addFavoriteRequest(this.state.repositoryInput);
    this.setState({
      repositoryInput: ""
    });
  };

  render() {
    return (
      <Fragment>
        <form onSubmit={this.handleAddRepository}>
          <input
            placeholder="usuário/repositório"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">Adicionar</button>
          {this.props.favorites.loading && <span>Carregando...</span>}

          {!!this.props.favorites.error && (
            <span style={{ color: "#f00" }}>{this.props.favorites.error}</span>
          )}
        </form>

        <ul>
          {this.props.favorites.data.map(favorite => (
            <li key={favorite.id}>
              <p>
                <strong>{favorite.name}</strong> {favorite.description}
                <a href={favorite.url}>Acessar</a>
              </p>
            </li>
          ))}
        </ul>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  favorites: state.favorites
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FavoriteActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
