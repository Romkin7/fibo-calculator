import { Stack, styled } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface ISignInContainerProps {
    direction?: 'row' | 'column';
    justifyContent?:
        | 'flex-start'
        | 'center'
        | 'flex-end'
        | 'space-between'
        | 'space-around'
        | 'space-evenly';
    style?: Record<string, string>;
}

type SignInContainerProps = PropsWithChildren & ISignInContainerProps;

const SignInContainer: FC<SignInContainerProps> = styled(Stack)(
    ({ theme, style }) => ({
        minHeight: '100%',
        padding: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            padding: theme.spacing(4),
        },
        '&::before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            zIndex: -1,
            inset: 0,
            backgroundImage:
                'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
            backgroundRepeat: 'no-repeat',
            ...theme.applyStyles('dark', {
                backgroundImage:
                    'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
            }),
        },
        ...style,
    }),
);

export default SignInContainer;
