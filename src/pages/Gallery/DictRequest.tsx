import InfoPanel from '@/components/InfoPanel'
import { useCallback, useState } from 'react'
import IconBook2 from '~icons/tabler/book-2'

export default function DictRequest() {
  const [showPanel, setShowPanel] = useState(false)

  const onOpenPanel = useCallback(() => {
    setShowPanel(true)
  }, [])

  const onClosePanel = useCallback(() => {
    setShowPanel(false)
  }, [])

  return (
    <>
      {showPanel && (
        <InfoPanel
          openState={showPanel}
          title="Dict Request"
          icon={IconBook2}
          buttonClassName="bg-indigo-500 hover:bg-indigo-400"
          iconClassName="text-indigo-500 bg-indigo-100 dark:text-indigo-300 dark:bg-indigo-500"
          onClose={onClosePanel}
        >
          <p className="text-sm text-gray-600 dark:text-gray-300">
            <br />
            Tell us your dict request via email{' '}
            <a href="mailto:zzhmail01@gmail.com" className="px-2 text-blue-500" aria-label="email2 zzhmail01@gmail.com">
            zzhmail01@gmail.com
            </a>
          </p>
          <br />
        </InfoPanel>
      )}
      <button className="cursor-pointer pr-6 text-sm text-indigo-500" onClick={onOpenPanel}>
        Do you have a dict request?
      </button>
    </>
  )
}
