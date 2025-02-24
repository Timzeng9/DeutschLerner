import { AmountImageMap } from './AmountQrMap'
import { Amount } from './components/Amount'
import { useEffect, useState } from 'react'

export type AmountType = -1 | 7 | 14 | 35 | 49 | 77
const displayAmount: AmountType[] = [7, 14, 35, 49, 77, -1]

export const DonatingCard = ({ className, onAmountChange }: { className?: string; onAmountChange?: (amount: AmountType) => void }) => {
  const [amount, setAmount] = useState<AmountType | undefined>(undefined)

  const onClickAmount = (amount: AmountType) => {
    setAmount(amount)
  }

  useEffect(() => {
    onAmountChange && amount && onAmountChange(amount as AmountType)
  }, [amount, onAmountChange])

  return (
    <div className={`flex w-full flex-col items-center justify-center gap-3 ${className && className}`}>
      <h2 className="self-start pl-1 font-bold text-gray-800 dark:text-gray-300">Select your donation amount: </h2>
      <div className="mt-2 flex gap-3">
        {displayAmount.map((a) => {
          return <Amount active={a === amount} key={a} amount={a} onClick={onClickAmount} />
        })}
      </div>

      <div className={`mt-3 flex w-full  flex-col  overflow-hidden px-2 transition-[height] duration-500 ${amount ? 'h-44' : 'h-0'}`}>
        {amount && (
          <div className="flex w-full justify-between">
            <img src={AmountImageMap[amount][0]} alt="alipay" className="max-w-[30%] h-auto" />
            <img src={AmountImageMap[amount][1]} alt="weChat" className="max-w-[30%] h-auto" />
            <img src={AmountImageMap[amount][2]} alt="payPal" className="max-w-[30%] h-auto" />
          </div>
        )}
      </div>
    </div>
  )
}
