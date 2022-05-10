import React from 'react';
import {connect} from 'react-redux';
import {Grid} from "@material-ui/core";
import './loader.scss';
import {bindActionCreators} from "redux";
import {setLoading} from "../../../store/common/commonActions";

//Icons
import SpinnerIcon from "@material-ui/icons/Refresh";
import {getLoadingSelector} from "../../../store/common/commonSelectors";

const mapStateToProps = (state) => {
  return {
    loading: getLoadingSelector(state)
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators({setLoading}, dispatch)
  }
};

function withLoader(Component: any) {
  class Loader extends React.Component<any> {

    renderLoader = () => {
      return <Grid container alignItems={"center"}>
        <Grid item xs={12}>
          <SpinnerIcon className='spinner'/>
        </Grid>
      </Grid>
    };

    render() {
      const {loading, ...props} = this.props;

      return loading ? this.renderLoader() : <Component {...props} />;
    }
  }

  return connect(mapStateToProps, mapDispatchToProps)(Loader);
}

export default withLoader;
