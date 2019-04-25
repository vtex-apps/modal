import React, { createContext } from 'react'

const { Consumer, Provider } = createContext({})

interface ModalContext {
  modalContext: any
}

const modalConsumer = <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & ModalContext> => 
  (props: P) => (
    <Consumer>
      {context => <WrappedComponent {...props} modalContext={context} />}
    </Consumer>
)

export default { Provider, modalConsumer }
