import { cn } from '@/lib/utils'
import { Link } from 'react-router-dom'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
// import { Button } from './custom/button'
import { IconMenu } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'



export function Navbar({ className, links, ...props }) {
    return (
        <>
            <div className='md:hidden'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button size='icon' variant='outline'>
                            <IconMenu />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent side='bottom' align='start'>
                        {links.map(({ title, href, isActive }) => (
                            <DropdownMenuItem key={`${title}-${href}`} asChild>
                                <Link
                                    to={href}
                                    className={!isActive ? 'text-muted-foreground' : ''}
                                >
                                    {title}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <nav
                className={cn(
                    'hidden items-center gap-10 md:flex lg:gap-6',
                    className
                )}
                {...props}
            >
                {links.map(({ title, href, isActive }) => (
                    <Link
                        key={`${title}-${href}`}
                        to={href}
                        className={`text-sm font-medium transition-colors hover:text-primary ${isActive ? '' : 'text-muted-foreground'}`}
                    >
                        {title}
                    </Link>
                ))}
            </nav>
        </>
    )
}
