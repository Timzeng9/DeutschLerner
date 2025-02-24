import tim from '@/assets/tim.png'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

export const AuthorButton = () => {
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip defaultOpen>
        <TooltipTrigger>
          <Avatar className="h-8 w-8 shadow-lg" onClick={() => window.open('https://timzeng.xyz', '_blank')}>
            <AvatarImage src={tim} alt="Timzeng Homepage" />
            <AvatarFallback>Tim</AvatarFallback>
          </Avatar>
        </TooltipTrigger>
        <TooltipContent className="cursor-pointer" onClick={() => window.open('https://timzeng.xyz', '_blank')}>
          <p>Click to visit my blog ❤️</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
