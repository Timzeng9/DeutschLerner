import React from 'react'

const InfoBox: React.FC<InfoBoxProps> = ({ info, description }) => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <span className="w-4/5  pb-2 text-center text-xl font-bold text-gray-600 transition-colors duration-300 dark:text-gray-400">
      {description} {info}
      </span>
    </div>
  )
}

export default React.memo(InfoBox)

export type InfoBoxProps = {
  info: string
  description: string
}
