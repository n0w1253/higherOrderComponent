import React, { Component } from 'react'
import { connect } from 'react-redux'


export default function(ComposedComponent) {

    class Authentication extends Component {
        static contextTypes = {   // static: define a class level property  Authentication.contextTypes
            router: React.PropTypes.object
        }

        componentWillMount() {
            if (!this.props.authenticated) {
                this.context.router.push('/')
            }
        }

        componentWillUpdate(nextProps) {
            if (!nextProps.authenticated) {
                this.context.router.push('/')
            }
        }

        render() {
         //   console.log(this.props.resources)  // => resourceList
          //  console.log(this.context)
            return <ComposedComponent {...this.props}/>
        }
    }

    function mapStateToProps({authenticated}) {
        return {authenticated}

    }

    return connect(mapStateToProps)(Authentication)
}

// In some other location, we want to use this HOC
// Pseudo Code:
//
// import Authentication  //this is my HOC
// import Resources //this is the component I want to wrap
//
// const ComposedComponent = Authentication(Resources)l
//
// render method
//<ComposedComponent resources={resourceList}/>