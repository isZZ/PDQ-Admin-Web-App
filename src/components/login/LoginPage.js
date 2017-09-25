import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {signInWithEmailAndPassword} from '../../actions/authActions';
import LoginForm from './LoginForm';
import toastr from 'toastr';
import {Button, Icon, Grid, Header} from 'semantic-ui-react';
import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import * as Colors from 'material-ui/styles/colors';

export class LoginPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      user: {
        email: "",
        password: ""
      },
      saving: false,
      errors: {
        email:false,
        password:false
      }
    };

    this.updateUserState = this.updateUserState.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  updateUserState(event) {
    const field = event.target.name;
    let user = this.state.user;
    user[field] = event.target.value;
    return this.setState({user: user});
  }

  createUser(event) {
    event.preventDefault();

    this.setState({saving: true});

    this.props.actions.signInWithEmailAndPassword(this.state.user)
      .then(user => toastr.success('You are logged in'))
      .catch(error => {

        switch(error.code){
          case "auth/invalid-email":
            this.setState({'errors':{
              email:error.message
            }})
            break;
          case "auth/user-not-found":
            this.setState({'errors':{
              email:false
            }})
            break;
          case "auth/wrong-password":
            this.setState({'errors':{
              password:error.message
            }})
            break;
        }


        console.log('Error');
        console.log(error);
        toastr.error(error.message);
        this.setState({saving: false});
      });
  }

  render() {
    return (
        <div style={styles.loginWrapper}>
          <svg style={styles.logo} version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 400 400"  xmlSpace="preserve">
              <defs>
                <filter id="f4">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
                  <feOffset dx="4" dy="4"/>
                  <feComponentTransfer>
                  <feFuncA type="linear" slope="0.1"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
                <filter id="f3">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="3"/> 
                  <feOffset dx="8" dy="8"/>
                  <feComponentTransfer>
                  <feFuncA type="linear" slope="0.1"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
              </defs>
              <path style={{fill:'#03A9F4'}} filter="url(#f4)" d="M313,308.9c28.2-28.9,45.7-68.3,45.7-111.8c0-44.1-17.9-84.1-46.9-113.1c-29-29-69-46.9-113.1-46.9
                    c-88.2,0-160,71.8-160,160s71.8,160,160,160c17.4,0,34.1-2.8,49.7-7.9l71.9,16.6L313,308.9z M99.1,197.1
                    c0-54.9,44.7-99.6,99.6-99.6c54.9,0,99.6,44.7,99.6,99.6c0,54.9-44.7,99.6-99.6,99.6C143.8,296.7,99.1,252,99.1,197.1z"/>
              <path style={{fill:'#B3E5FC'}} filter="url(#f3)" d="M38.8,197.1c0,44.1,17.9,84.1,46.9,113.1l42.6-42.6c-18-18-29.2-43-29.2-70.4
                c0-54.9,44.7-99.6,99.6-99.6c27.5,0,52.4,11.2,70.4,29.2L311.8,84c-29-29-69-46.9-113.1-46.9C110.5,37.1,38.8,108.9,38.8,197.1z"/>
          </svg>
          <Card style={styles.card}>
            <CardTitle
            title="Sign in to PDQ"
            style={styles.cardTitle}
            titleColor="#ffffff"
            titleStyle={styles.cardTitleStyle}
            />
              <LoginForm
                onChange={this.updateUserState}
                onSave={this.createUser}
                saving={this.state.saving}
                user={this.state.user}
                errors={this.state.errors}
                />
          </Card>
        </div>
    );
  }
}

LoginPage.propTypes = {
  actions: React.PropTypes.object
};

let styles = {
  loginWrapper: {
    display:'flex',
    flexDirection:'column',
    alignItems: 'center',
    backgroundColor:Colors.grey900,
    alignSelf:'center',
    padding:'3rem 0 4rem 0'
  },
  formWrapper:{
    margin:'2rem 0'
  },
  logo:{
    width:'10rem',
    alignSelf:'center',
    marginBottom:'3rem'
  },
  card:{
     width:'28rem'
  },
  cardTitle:{
    backgroundColor:Colors.blue500,
    textAlign:'center'
  },
  cardTitleStyle:{
    fontFamily:'Lato',
    fontWeight:500
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({signInWithEmailAndPassword}, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
