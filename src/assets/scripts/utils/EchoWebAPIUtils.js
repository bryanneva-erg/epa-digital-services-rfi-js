import EchoServerActionCreators from '../actions/EchoServerActionCreators';

class APIUtils {
    newFoo(data){
        EchoServerActionCreators.newFoo(data);
    }

    saveFoo(data){    
        EchoServerActionCreators.saveFoo(data);
    }

    removeFoo(){    
        EchoServerActionCreators.saveFoo('Remove Foo');
    }
}

const EchoWebAPIUtils = new APIUtils();

export default EchoWebAPIUtils;