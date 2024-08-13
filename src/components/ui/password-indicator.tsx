import { FC } from 'react'
import { useFormContext } from 'react-hook-form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './tooltip'
import { IconInfoCircle, IconCheck, IconX } from '@tabler/icons-react'
import { Regex } from '@/utilities/regex'

interface PasswordIndicatorProps {
  name: string
}

export const PasswordIndicator: FC<PasswordIndicatorProps> = ({ name }) => {
  const { watch } = useFormContext()
  const { UPPERCASE, LOWERCASE, NUMBER, SPECIAL_CHAR } = Regex
  const MIN_CHARACTER = 8
  const password = watch(name, '') // Watch the field based on the `name` prop

  const calculatePasswordStrength = (password: string) => {
    let strength = 0

    if (password.length >= MIN_CHARACTER) strength += 1
    if (UPPERCASE.test(password)) strength += 1
    if (LOWERCASE.test(password)) strength += 1
    if (NUMBER.test(password)) strength += 1
    if (SPECIAL_CHAR.test(password)) strength += 1

    return strength
  }

  const strength = calculatePasswordStrength(password)

  const requirements = [
    {
      text: `Must be minimum ${MIN_CHARACTER} characters`,
      check: password.length >= MIN_CHARACTER,
    },
    {
      text: 'Must have at least 1 uppercase letter',
      check: UPPERCASE.test(password),
    },
    {
      text: 'Must have at least 1 lowercase letter',
      check: LOWERCASE.test(password),
    },
    { text: 'Must have at least 1 number', check: NUMBER.test(password) },
    {
      text: 'Must have at least 1 special character',
      check: SPECIAL_CHAR.test(password),
    },
  ]

  return (
    <div className='mt-1 flex items-center justify-between gap-4'>
      <div className='flex max-w-[380px] flex-grow items-center justify-stretch space-x-1'>
        {Array.from({ length: 5 }, (_, index) => {
          const color =
            index < strength
              ? strength <= 2
                ? 'bg-[#ff1744]'
                : strength === 3
                  ? 'bg-[#ffc400]'
                  : 'bg-[#097837]'
              : 'bg-gray-300/90'
          return (
            <div key={index} className={`h-1 w-full rounded-full ${color}`} />
          )
        })}
      </div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <IconInfoCircle
                size={16}
                className='cursor-pointer text-gray-500'
              />
            </div>
          </TooltipTrigger>
          <TooltipContent className='max-w-xs rounded-md bg-white py-2 shadow-lg'>
            <ul className='list-disc space-y-2 pl-2 text-gray-700'>
              {requirements.map((req, index) => (
                <li key={index} className='flex items-center space-x-2'>
                  {req.check ? (
                    <IconCheck size={16} className='text-green-500' />
                  ) : (
                    <IconX size={16} className='text-red-500' />
                  )}
                  <span
                    className={`text-gray-500 ${req.check ? 'line-through' : ''}`}
                  >
                    {req.text}
                  </span>
                </li>
              ))}
            </ul>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
