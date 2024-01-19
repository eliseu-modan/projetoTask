function withContexts(Provider) {
  return (Component) => {
    return (props) => (
      <Provider>
        <Component {...props} />
      </Provider>
    );
  };
}

export default withContexts;
