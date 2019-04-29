import React, {
  Fragment,
  FunctionComponent,
  ReactElement,
  useState,
  useCallback,
  useMemo
} from 'react'
import classNames from 'classnames'
import { generateBlockClass, BlockClass } from '@vtex/css-handles'
//@ts-ignore
import { Modal } from 'vtex.styleguide'

import Context from './ModalContext'
//@ts-ignore
import styles from './styles.css'

const { Provider } = Context

interface ModalProps {
  centered: boolean
  closeOnEsc: boolean
  closeOnOverlayClick: boolean
  showCloseIcon: boolean
  children: ReactElement
  buttonLabel: string
  buttonClass: string | null
}

interface StorefrontComponent
  extends FunctionComponent<ModalProps & BlockClass> {
  schema?: any
}

const ModalComponent: StorefrontComponent = ({
  centered,
  closeOnEsc,
  closeOnOverlayClick,
  showCloseIcon,
  children,
  buttonLabel,
  buttonClass,
  blockClass,
}) => {
  const [isOpen, setOpen] = useState(false)
  const onClick = useCallback(() => setOpen(true), [])
  const onClose = useCallback(() => setOpen(false), [])

  const buttonClasses = classNames(
    generateBlockClass(styles.button, blockClass),
    't-action pointer pv3 nv3 ph4 nh4 c-action-primary',
    buttonClass,
  )

  const modalContext = useMemo(() => ({ closeModal: onClose }), [onClose]) 

  return (
    <Fragment>
      <div className={buttonClasses} onClick={onClick} role="button">
        {buttonLabel}
      </div>
      <div className={generateBlockClass(styles.container, blockClass)}>
        <Modal
          isOpen={isOpen}
          centered={centered}
          onClose={onClose}
          closeOnEsc={closeOnEsc}
          closeOnOverlayClick={closeOnOverlayClick}
          showCloseIcon={showCloseIcon}
        >
          <div
            className={`${generateBlockClass(
              styles.childrenContainer,
              blockClass
            )} flex flex-grow-1`}
          >
            <Provider value={modalContext}>
              {children}
            </Provider>
          </div>
        </Modal>
      </div>
    </Fragment>
  )
}

ModalComponent.defaultProps = {
  centered: false,
  closeOnEsc: true,
  closeOnOverlayClick: true,
  showCloseIcon: true,
  buttonLabel: '',
  buttonClass: null,
}

ModalComponent.schema = {
  title: 'editor.modal.title',
  description: 'editor.modal.description',
  type: 'object',
  properties: {
    centered: {
      title: 'editor.modal.centered.title',
      description: 'editor.modal.centered.description',
      type: 'boolean',
      default: false,
      isLayout: true,
    },
    closeOnEsc: {
      title: 'editor.modal.closeOnEsc.title',
      description: 'editor.modal.closeOnEsc.description',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    closeOnOverlayClick: {
      title: 'editor.modal.closeOnOverlayClick.title',
      description: 'editor.modal.closeOnOverlayClick.description',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    showCloseIcon: {
      title: 'editor.modal.showCloseIcon.title',
      description: 'editor.modal.showCloseIcon.description',
      type: 'boolean',
      default: true,
      isLayout: true,
    },
    buttonLabel: {
      title: 'editor.modal.buttonLabel.title',
      description: 'editor.modal.buttonLabel.description',
      type: 'string',
      default: '',
    },
    buttonClass: {
      title: 'editor.modal.buttonClass.title',
      description: 'editor.modal.buttonClass.description',
      type: 'string',
      default: null,
      isLayout: true,
    },
    blockClass: {
      title: 'editor.modal.blockClass.title',
      description: 'editor.modal.blockClass.description',
      type: 'string',
      default: null,
      isLayout: true,
    },
  },
}

export default ModalComponent
