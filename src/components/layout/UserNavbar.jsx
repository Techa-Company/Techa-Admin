import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
// import { Button } from '@/components/custom/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

export function UserNavbar() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost' className='relative h-8 w-8 rounded-full'>
                    <Avatar className='h-10 w-10'>
                        <AvatarImage src='https://avatars.githubusercontent.com/u/91675032?v=4' alt='@shadcn' />
                        <AvatarFallback>RJ</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56' align='end' forceMount>
                <DropdownMenuLabel className='font-normal'>
                    <div className='flex flex-col space-y-1'>
                        <p className='text-sm font-medium leading-none'>رامین جوشنگ</p>
                        <p className='text-xs leading-none text-muted-foreground'>
                            rjwshng@gmail.com
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <Link to="/account/profile">
                            پروفایل
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        سبد خرید
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                        تنظیمات
                    </DropdownMenuItem>
                    <DropdownMenuItem>منوی جدید</DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                    خروج
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
