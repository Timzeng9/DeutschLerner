import { DonatingCard } from '../DonatingCard'
import InfoPanel from '@/components/InfoPanel'
import { infoPanelStateAtom } from '@/store'
import type { InfoPanelType } from '@/typings'
import { useAtom } from 'jotai'
import type React from 'react'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import IconMail from '~icons/material-symbols/mail'
import IconCoffee2 from '~icons/mdi/coffee'
import IconGithub from '~icons/simple-icons/github'
import IconCoffee from '~icons/tabler/coffee'

const Footer: React.FC = () => {
  const [infoPanelState, setInfoPanelState] = useAtom(infoPanelStateAtom)
  const navigate = useNavigate()

  const handleOpenInfoPanel = useCallback(
    (modalType: InfoPanelType) => {
      setInfoPanelState((state) => ({ ...state, [modalType]: true }))
    },
    [setInfoPanelState],
  )

  const handleCloseInfoPanel = useCallback(
    (modalType: InfoPanelType) => {
      setInfoPanelState((state) => ({ ...state, [modalType]: false }))
    },
    [setInfoPanelState],
  )

  return (
    <>
      <InfoPanel
        openState={infoPanelState.donate}
        title="Buy us a coffee"
        icon={IconCoffee}
        buttonClassName="bg-amber-500 hover:bg-amber-400"
        iconClassName="text-amber-500 bg-amber-100 dark:text-amber-300 dark:bg-amber-500"
        onClose={() => handleCloseInfoPanel('donate')}
      >
        <p className="indent-4 text-sm text-gray-500 dark:text-gray-300">
        Thank you very much for using Deutsche Wordart Game. The website is currently being maintained in our spare time. In order to ensure that the website can continue to provide high-quality services to everyone, we need your help!
          <br />
          <br />
          Your donation will help us cover the operating costs of the website, improve the functionality and design of the website, and enhance the user experience.
          <br />
        </p>
        <br />
        <p className="indent-4 text-sm text-gray-700 dark:text-gray-200">
        We believe that joint efforts can make Deutsche Wordart Game a better learning platform, and we also believe that your support will give us the motivation to keep moving forward. Thank you for your support! I hope you can share your happiness with your friends!
        </p>
        <br />
        <DonatingCard />
      </InfoPanel>

      <footer className="mb-1 mt-4 flex w-full items-center justify-center gap-2.5 text-sm ease-in" onClick={(e) => e.currentTarget.blur()}>
        <a href="https://github.com/Timzeng9/DeutschLerner" target="_blank" rel="noreferrer" aria-label="Go to GitHub Page">
          <IconGithub fontSize={15} className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-100" />
        </a>
        
        <button
          className="cursor-pointer focus:outline-none "
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('donate')
            e.currentTarget.blur()
          }}
          aria-label="donate"
        >
          <IconCoffee2 fontSize={16} className="text-gray-500 hover:text-amber-500 dark:text-gray-400 dark:hover:text-amber-500" />
        </button>

        <a
          href="mailto:zzhmail01@gmail.com"
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.currentTarget.blur()}
          aria-label="mailto zzhmail01@gmail.com"
        >
          <IconMail fontSize={16} className="text-gray-500 hover:text-indigo-400 dark:text-gray-400 dark:hover:text-indigo-400" />
        </a>

        <button
          className="cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          type="button"
          onClick={(e) => {
            handleOpenInfoPanel('donate')

            e.currentTarget.blur()
          }}
        >
          @ Deutsche Wordart Game
        </button>

      </footer>
    </>
  )
}

export default Footer
