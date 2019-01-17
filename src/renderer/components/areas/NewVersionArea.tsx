import './NewVersionArea.scss'

import * as React from 'react'
import { shell } from 'electron'
import * as marked from 'marked'

import { SMMButton } from '../buttons/SMMButton'

interface NewVersionAreaProps {
  patchNotes: string
  versionUrl: string
  autoUpdate: boolean
  progress?: number
  onClose?: () => void
}

interface NewVersionAreaState {
  progress: number
}

export class NewVersionArea extends React.PureComponent<NewVersionAreaProps, NewVersionAreaState> {
  private patchNotesRenderer: HTMLDivElement | null = null

  constructor (props: NewVersionAreaProps) {
    super(props)
    this.state = {
      progress: 0
    }
    this.onClose = this.onClose.bind(this)
  }

  private onClose (): void {
    const { onClose } = this.props
    if (onClose) onClose()
  }

  public componentDidMount (): void {
    if (!this.props.patchNotes || !this.patchNotesRenderer) return
    this.patchNotesRenderer.innerHTML = marked(this.props.patchNotes)
    const nodes: NodeListOf<HTMLDivElement> = this.patchNotesRenderer.querySelectorAll('.markdown a')
    for (let i = 0; i < nodes.length; i++) {
      const href = nodes[i].getAttribute('href')
      nodes[i].removeAttribute('href')
      nodes[i].onclick = () => {
        if (!href) return
        shell.openExternal(href)
      }
    }
  }

  public render (): JSX.Element {
    const { autoUpdate, versionUrl } = this.props
    const { progress } = this.state
    return (
      <div className='new-version-area-wrapper'>
        <div className='new-version-area'>
          <div className='new-version-area-description'>
            <h2>A new version is available</h2>
            <div
              className='markdown'
              style={{
                width: '100%',
                flex: '1 0 auto'
              }}
              ref={ x => { this.patchNotesRenderer = x } }
            />
          </div>
          {
            autoUpdate &&
            <progress
              className={`new-version-area-progress${progress ? ' global-invisible' : ''}`}
              value={progress}
            ></progress>
          }
          <SMMButton
            link={versionUrl} external
            text='Download'
            iconSrc='img/net64.svg'
          />
          {
            !autoUpdate &&
            <SMMButton
              onClick={this.onClose}
              text='Ignore'
              iconSrc='img/cancel.svg'
              styles={{
                icon: {
                  padding: '4px'
                }
              }}
            />
          }
        </div>
      </div>
    )
  }
}
