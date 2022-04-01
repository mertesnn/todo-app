import { Chip } from '@mui/material'

const Chips = ({ color, label }: ChipProps) => {
    return (
        <Chip
            color={color}
            label={label}
            style={{
                borderRadius: '5px',
                fontWeight: 'bold',
                width: '80px',
            }}
        />
    )
}

export default Chips
