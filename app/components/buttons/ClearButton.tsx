import { Button } from "@/components/ui/button"

interface IParams {
    label: string;
    onClick: () => void;
    disabled?: boolean;
}

const ClearButton: React.FC<IParams> = ({
    label,
    onClick,
    disabled,
}) => {
    return (
        <Button variant='outline' onClick={onClick} disabled={disabled}>{label}</Button>
    )
}

export default ClearButton;