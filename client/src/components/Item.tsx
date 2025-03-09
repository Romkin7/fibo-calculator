import { Paper, styled } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

interface IItemProps {
    style?: Record<string, string>;
}

type ItemProps = PropsWithChildren & IItemProps;

const Item: FC<ItemProps> = styled(Paper)(({ theme, style }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    ...theme.applyStyles('dark', {
        backgroundColor: '#1A2027',
    }),
    ...style,
}));

export default Item;
